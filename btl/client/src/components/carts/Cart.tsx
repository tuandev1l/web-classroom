import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllItemsFromCart, getClientSecret } from '../../apis';
import { ButtonType } from '../../enums';
import { AppContext } from '../../stores/Provider';
import { IAddToCart, ICart } from '../../types';
import Button from '../common/Button';
import Confirm from '../common/Confirm';
import Layout from '../common/Layout';
import CartItem from './CartItem';
import useToast from '../../hooks/useToast';

type Props = {};

const calculateTotalMoney = (items: IAddToCart[]) =>
  items.reduce(
    (sum: number, el: IAddToCart) => (sum += el.money * el.quantity),
    0
  );

let amount: number, description: string;

const Cart = ({}: Props) => {
  const { addMutipleItems, items } = useContext(AppContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  let totalMoney = calculateTotalMoney(items);
  const [enabled, setEnable] = useState(false);
  const toast = useToast;

  const showModalHandler = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  useEffect(() => {
    totalMoney = calculateTotalMoney(items);
  }, [items]);

  useQuery({
    queryKey: ['cart'],
    queryFn: getAllItemsFromCart,
    onSuccess(data: AxiosResponse) {
      const res = data.data as ICart;
      addMutipleItems(
        res.item.map((item) => ({
          bookId: item.book.id,
          money: item.book.money,
          quantity: item.quantity,
          title: item.book.title,
        }))
      );
    },
  });

  useQuery({
    queryKey: ['clientSecret'],
    queryFn: () => getClientSecret({ amount, description }),
    onSuccess(data) {
      localStorage.setItem('clientSecret', data.data['clientSecret']);
      navigate('/stripe');
    },
    onError() {
      toast({ type: 'error', message: 'Can not create client Secret' });
    },
    enabled,
  });

  const purchaseHandler = () => {
    amount = totalMoney;
    description = `${localStorage.getItem(
      'name'
    )} - ${new Date().toISOString()}`;
    setEnable(true);
  };

  return (
    <Layout>
      {totalMoney ? (
        <>
          <table className='table table-zebra mt-4'>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Money</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <CartItem
                  key={Math.random()}
                  bookId={item.bookId}
                  idx={idx}
                  money={item.money}
                  number={item.quantity}
                  title={item.title}
                />
              ))}
            </tbody>
          </table>
          <div className='flex justify-between items-center mt-4 gap-4 '>
            <div className='flex-1 text-right'>
              Total money: &nbsp;
              <span className='text-orange-400 font-semibold text-xl'>
                {totalMoney}
              </span>
            </div>
            <div
              onClick={showModalHandler}
              className='flex-1 flex'
            >
              <Button
                name='Purchase'
                type={ButtonType.INFO}
              />
            </div>
          </div>
        </>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center h-96 text-3xl font-semibold '>
          <div>Empty cart :((</div>
          <Link to={'/'}>
            <Button
              name='Back to books'
              type={ButtonType.INFO}
            />
          </Link>
        </div>
      )}
      <Confirm
        action={purchaseHandler}
        handleCloseModal={handleCloseModal}
        message='Do you want to buy more books?'
        messageAgree='No, I want to purchase'
        messageDisagree='Yes'
        show={show}
      />
    </Layout>
  );
};

export default Cart;

import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { deleteItemFromCart, updateItemFromCart } from '../../apis';
import useToast from '../../hooks/useToast';
import { AppContext } from '../../stores/Provider';
import { IAddToCart } from '../../types';
import Button from '../common/Button';
import { ButtonType } from '../../enums';
import Confirm from '../common/Confirm';

type Props = {
  bookId: number;
  idx: number;
  money: number;
  number: number;
  title: string;
};

const CartItem = ({ bookId, title, idx, money, number }: Props) => {
  const [quantity, setQuantity] = useState(number);
  const { removeItem, updateItem } = useContext(AppContext);
  const toast = useToast;
  const [show, setShow] = useState(false);

  const showModalHandler = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (bookId: number) => deleteItemFromCart(bookId),
    onSuccess(_, bookId) {
      toast({ type: 'success', message: 'Delete item successfully' });
      removeItem(bookId);
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: (item: IAddToCart) => updateItemFromCart(item),
    onSuccess(_, item) {
      toast({ type: 'success', message: 'Update item successfully' });
      updateItem(item);
    },
  });

  const deleteBookHandler = () => {
    deleteMutation(bookId);
  };

  const decreaseHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseHandler = () => {
    if (quantity < 50) {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    const item: IAddToCart = {
      bookId,
      money,
      quantity,
      title,
    };
    if (quantity !== number) {
      updateItem(item);
      const timer = setTimeout(() => {
        updateMutation(item);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [quantity]);

  return (
    <>
      <tr>
        <th>{idx + 1}</th>
        <td>{title}</td>
        <td>{money}</td>
        <td>
          <div className='flex'>
            <button
              onClick={decreaseHandler}
              className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-gray-300 w-6 rounded-l-md text-xl'
              disabled={quantity <= 1}
            >
              -
            </button>
            <div className='w-10 bg-white text-lg p-1 text-center'>
              {quantity}
            </div>
            <button
              onClick={increaseHandler}
              className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-6 rounded-r-md bg-gray-300 text-xl'
              disabled={quantity >= 50}
            >
              +
            </button>
          </div>
        </td>
        <td>{money * quantity}</td>
        <td>
          {
            <div>
              <div
                className='flex'
                onClick={showModalHandler}
              >
                <Button
                  name='Delete'
                  type={ButtonType.ERROR}
                />
              </div>
            </div>
          }
        </td>
      </tr>
      <Confirm
        action={deleteBookHandler}
        handleCloseModal={handleCloseModal}
        message='Do you want to delete this book?'
        messageAgree='Yes'
        messageDisagree="No, It's my mistake"
        show={show}
      />
    </>
  );
};

export default CartItem;

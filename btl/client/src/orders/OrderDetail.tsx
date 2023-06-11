import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cancelOrder, getOrderById, updateStatusOrder } from '../apis';
import Button from '../components/common/Button';
import Layout from '../components/common/Layout';
import { ButtonType, OrderStatus, Role } from '../enums';
import useToast from '../hooks/useToast';
import { IErrorReponse, IOrder, IStatusSend } from '../types';
import { convertDate } from '../utils';
import ItemDetail from './ItemDetail';
import { AxiosError } from 'axios';

type Props = {};

interface IupdateStatus {
  id: string;
  statusOrder: IStatusSend;
}

const orderStatus = Object.keys(OrderStatus).filter(
  (el) => el !== OrderStatus.CANCELED
);

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

const backgroundColor = (status: OrderStatus) => {
  if (status === OrderStatus.PENDING) return 'bg-sky-200';
  if (status === OrderStatus.ACCEPTED) return 'bg-lime-200';
  if (status === OrderStatus.DELIVERED) return 'bg-yellow-200';
  if (status === OrderStatus.SUCCESSFUL) return 'bg-green-200';
  return 'bg-red-300';
};

const OrderDetail = ({}: Props) => {
  const params = useParams();
  const id = params.id;
  const [order, setOrder] = useState<IOrder>();
  const toast = useToast;
  const isAdmin = localStorage.getItem('role') === Role.ADMIN;
  const queryClient = useQueryClient();

  let index = 0,
    isCanceledOrder = false,
    isSuccessfulOrder = false,
    bgColor = 'bg-white';
  if (order) {
    index = orderStatus.indexOf(order.status) + 1;
    isCanceledOrder = order.status === OrderStatus.CANCELED;
    isSuccessfulOrder = order.status === OrderStatus.SUCCESSFUL;
    bgColor = backgroundColor(order.status);
  }

  if (id) {
    useQuery({
      queryKey: ['orders', id],
      queryFn: () => getOrderById(id),
      onSuccess(data) {
        setOrder(data.data);
      },
      keepPreviousData: true,
    });
  }

  const { mutate: cancelMutate } = useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    onSuccess() {
      toast({ type: 'success', message: 'Cancel order successfully' });
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message:
          (error.response as IErrorReponse).data.message ||
          'Can not cancel this order, please try again',
      });
    },
  });

  const { mutate: updateStatusMutate } = useMutation({
    mutationFn: ({ id, statusOrder }: IupdateStatus) =>
      updateStatusOrder(id, statusOrder),
    onSuccess() {
      toast({ type: 'success', message: 'Update order status successfully' });
      queryClient.invalidateQueries(['orders', id]);
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message:
          (error.response as IErrorReponse).data.message ||
          'Can not update status this order, please try again',
      });
    },
  });

  const cancelOrderHandler = () => {
    cancelMutate(id!);
  };

  const statusChangeHandler = (status: string) => {
    if (isAdmin) {
      updateStatusMutate({ id: id!, statusOrder: { status } });
    }
  };

  return (
    <Layout>
      <div className={`mx-20 px-16 py-6 my-3 ${bgColor} rounded-2xl`}>
        <div className='text-center text-xl text-gray-800 uppercase my-2'>
          Order detail
        </div>
        <div className='flex justify-center items-center my-4'>
          <ul className='steps'>
            {orderStatus.map((status, idx) => (
              <li
                className={classNames(
                  `step min-w-max w-36 ${idx < index ? 'step-primary' : ''}`,
                  { 'cursor-pointer': isAdmin }
                )}
                key={status}
                onClick={() => statusChangeHandler(status)}
              >
                {capitalize(status)}
              </li>
            ))}
          </ul>
        </div>
        <div className='my-4'>
          <div className='mb-2'>User purchase details:</div>
          <table className='table bg-white'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Type of purchase</th>
                <th>Created at</th>
                <th>Expect Delivered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order?.user.name}</td>
                <td>{order?.user.email}</td>
                <td>{order?.user.address}</td>
                <td>{'Credit card'}</td>
                <td>{convertDate(order?.createdAt || null)}</td>
                <td>{convertDate(order?.expectDelivered || null)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='mb-4'>List of books:</div>
        <div className='overflow-x-auto'>
          <table className='table bg-white'>
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
              {order?.item.map((item, idx) => (
                <ItemDetail
                  key={item.id}
                  idx={idx}
                  isCommented={item.isCommented}
                  isSuccessfulOrder={isSuccessfulOrder}
                  money={item.book.money}
                  quantity={item.quantity}
                  title={item.book.title}
                  type={item.book.type.name}
                  author={item.book.author}
                  published={item.book.published}
                  bookId={item.book.id}
                  orderId={id!}
                  comment={item.comment}
                  image={item.book.image}
                />
              ))}
            </tbody>
          </table>
        </div>
        {!isCanceledOrder && !isSuccessfulOrder && (
          <div className='mt-4 flex justify-between items-center w-full'>
            <div className='flex-1 text-right mx-4'>Cancel order:</div>
            <div
              className='flex w-1/2'
              onClick={cancelOrderHandler}
            >
              <Button
                name='Cancel'
                type={ButtonType.ERROR}
                cls={isCanceledOrder ? 'disabled' : ''}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetail;

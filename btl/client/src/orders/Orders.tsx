import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../apis';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import { ButtonType, OrderStatus } from '../enums';
import { IOrder } from '../types';
import { convertDate } from '../utils';

type Props = {};

const handleColor = (status: OrderStatus) => {
  if (status === OrderStatus.PENDING) {
    return ButtonType.INFO;
  }
  if (status === OrderStatus.CANCELED) {
    return ButtonType.ERROR;
  }
  if (status === OrderStatus.DELIVERED) {
    return ButtonType.WARNING;
  }
  return ButtonType.SUCCESS;
};

const Orders = ({}: Props) => {
  const [orders, setOrders] = useState<IOrder[]>();

  useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
    onSuccess(data) {
      setOrders(data.data);
    },
  });

  return (
    <Layout>
      {orders?.length ? (
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            <thead>
              <tr>
                <th></th>
                <th>Number of books</th>
                <th>Ordered at</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, idx) => (
                <tr
                  className=''
                  key={order.id}
                >
                  <th>{idx + 1}</th>
                  <td>{order.item.length}</td>
                  <td>{convertDate(order.createdAt)}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link to={`/orders/${order.id}`}>
                      <div className='flex'>
                        <Button
                          name='View'
                          type={handleColor(order.status)}
                        />
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center h-96 text-3xl font-semibold '>
          <div>No orders :((</div>
          <Link to={'/'}>
            <Button
              name='Back to books'
              type={ButtonType.INFO}
            />
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default Orders;

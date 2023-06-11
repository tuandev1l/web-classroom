import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { createOrder, getAllItemsFromCart } from '../../apis';
import { ButtonType } from '../../enums';
import { ICart } from '../../types';
import Button from '../common/Button';

type Props = {};

const Success = ({}: Props) => {
  const { mutate } = useMutation({
    mutationFn: createOrder,
  });

  useQuery({
    queryKey: ['cart'],
    queryFn: getAllItemsFromCart,
    onSuccess(data) {
      if ((data.data as ICart).item.length) {
        mutate();
        localStorage.removeItem('clientSecret');
      }
    },
  });

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-3/5 h-3/5 shadow-2xl rounded-2xl flex flex-col justify-center items-center'>
        <div className='font-semibold text-6xl'>Success 🎉</div>
        <div className='font-semibold text-xl my-4'>
          You have created order, books will be soon delivered to you.
        </div>
        <Link to={'/books'}>
          <Button
            name='Back to books'
            type={ButtonType.INFO}
          />
        </Link>
      </div>
    </div>
  );
};

export default Success;

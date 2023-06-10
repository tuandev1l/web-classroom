import { useContext } from 'react';
import { CheckSquare, LogOut, ShoppingCart } from 'react-feather';
import { Link } from 'react-router-dom';
import '../../App.css';
import useToast from '../../hooks/useToast';
import { AppContext } from '../../stores/Provider';
import Logo from './Logo';
import { useQuery } from '@tanstack/react-query';
import { getAllItemsFromCart } from '../../apis';
import { AxiosResponse } from 'axios';
import { ICart } from '../../types';

type Props = {};

const Header = ({}: Props) => {
  const name = localStorage.getItem('name');
  const { items, addMutipleItems } = useContext(AppContext);
  const toast = useToast;
  const { handleLoggedIn } = useContext(AppContext);

  const logoutHandler = () => {
    localStorage.clear();
    toast({ type: 'success', message: 'Logout successfully' });
    handleLoggedIn();
  };

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

  return (
    <div className='flex justify-between items-center'>
      <Link to={'/books'}>
        <Logo />
      </Link>
      <div className='flex justify-center items-center gap-4'>
        <Link to={'/cart'}>
          <div className='hover:bg-gray-300 rounded-full p-3 transition-all duration-15000 ease-out hover:ease-in relative'>
            <ShoppingCart className='feather-32 cursor-pointer' />
            <div className='absolute -top-1 -right-1 bg-red-500 w-7 h-7 rounded-full text-center text-white flex justify-center items-center'>
              <span>{items.length}</span>
            </div>
          </div>
        </Link>
        <Link to={'/orders'}>
          <CheckSquare className='feather-32 cursor-pointer' />
        </Link>
        <div className='flex gap-2 justify-center items-center'>
          <div className='w-16 rounded-full avatar'>
            <img src='https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg' />
          </div>
          <div className='username block'>{name}</div>
        </div>
        <div
          onClick={logoutHandler}
          className='hover:bg-gray-300 rounded-full p-3 cursor-pointer'
        >
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Header;

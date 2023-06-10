import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { loginAccount } from '../../apis';
import useToast from '../../hooks/useToast';
import { AppContext } from '../../stores/Provider';
import { IErrorReponse, ILogin, IUserResponse } from '../../types';
import { loginDefault } from '../../values';
import Button from '../common/Button';
import Required from '../common/Required';
import { ButtonType } from '../../enums';

type Props = {};

const Login = ({}: Props) => {
  const [user, setUser] = useState<ILogin>(loginDefault);
  const toast = useToast;
  const { handleLoggedIn } = useContext(AppContext);

  const handleChange =
    (key: keyof ILogin) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [key]: e.target.value });
    };

  const isValidSignup = () => {
    let isValid = true;
    if (!user.email) {
      toast({ type: 'error', message: 'email is not empty' });
      isValid = false;
    }
    if (!user.password) {
      toast({ type: 'error', message: 'password is not empty' });
      isValid = false;
    }
    return isValid;
  };

  const { mutate } = useMutation({
    mutationFn: (user: ILogin) => loginAccount(user),
    onSuccess(data: AxiosResponse) {
      const res = data.data as IUserResponse;
      localStorage.setItem('token', res.token);
      localStorage.setItem('name', res.name);
      localStorage.setItem('role', res.role);
      toast({ type: 'success', message: 'Login successfully!' });
      handleLoggedIn();
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message: (error.config as IErrorReponse).data.message,
      });
    },
  });

  const submitFormHandler = () => {
    if (!isValidSignup()) return;
    mutate(user);
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-300 '>
      <div className='w-4/12 h-10/12 bg-white flex flex-col rounded-3xl p-8'>
        <div className='text-center mt-4 font-semibold text-2xl'>Login</div>
        <form>
          <label className='block flex-1 mb-3'>
            <span className='block text-sm font-medium text-slate-700'>
              Email {<Required />}
            </span>
            <input
              type='email'
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
              required
              value={user.email}
              onChange={handleChange('email')}
            />
          </label>
          <label className='block flex-1  mb-3'>
            <span className='block text-sm font-medium text-slate-700'>
              Password {<Required />}
            </span>
            <input
              type='password'
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
              required
              value={user.password}
              onChange={handleChange('password')}
            />
          </label>
        </form>
        <div
          className='mt-4 w-full flex'
          onClick={submitFormHandler}
        >
          <Button
            name='Login'
            type={ButtonType.INFO}
          />
        </div>
        <div className='mt-4 text-center '>
          Do not have an account?&nbsp;
          <span className='font-semibold'>
            <Link to={'/signup'}>Create one</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

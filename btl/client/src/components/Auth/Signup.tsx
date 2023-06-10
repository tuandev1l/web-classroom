import { useMutation } from '@tanstack/react-query';
import { IErrorReponse, ISignup, IUserResponse } from '../../types';
import { signupDefault } from '../../values';
import Button from '../common/Button';
import Required from '../common/Required';
import { useState } from 'react';
import { signupAccount } from '../../apis';
import { AxiosError, AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import { ButtonType } from '../../enums';

type Props = {};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Signup = ({}: Props) => {
  const [user, setUser] = useState<ISignup>(signupDefault);
  const toast = useToast;
  const navigate = useNavigate();

  const handleChange =
    (key: keyof ISignup) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [key]: e.target.value });
    };

  const { mutate } = useMutation({
    mutationFn: (user: ISignup) => signupAccount(user),
    onSuccess(data: AxiosResponse) {
      const res = data.data as IUserResponse;
      localStorage.setItem('token', res.token);
      localStorage.setItem('name', res.name);
      localStorage.setItem('role', res.role);
      toast({ type: 'success', message: 'Create account successfully!' });
      navigate('/books');
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message: (error.config as IErrorReponse).data.message,
      });
    },
  });

  const isValidSignup = () => {
    let isValid = true;
    if (!user.name) {
      toast({ type: 'error', message: 'name is not empty' });
      isValid = false;
    }

    if (!user.email) {
      toast({ type: 'error', message: 'email is not empty' });
      isValid = false;
    } else if (!user.email.toLowerCase().match(emailRegex)) {
      toast({ type: 'error', message: 'email is not valid' });
      isValid = false;
    }

    if (!user.password) {
      toast({ type: 'error', message: 'password is not empty' });
      isValid = false;
    } else if (!user.password.match(passwordRegex)) {
      toast({ type: 'error', message: 'password is too weak' });
      isValid = false;
    }

    if (!user.passwordConfirm) {
      toast({ type: 'error', message: 'passwordConfirm must be day' });
      isValid = false;
    }
    return isValid;
  };

  const submitFormHandler = () => {
    if (!isValidSignup()) return;
    mutate(user);
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-300 '>
      <div className='w-4/12 h-10/12 bg-white flex flex-col rounded-3xl p-8'>
        <div className='text-center font-semibold text-2xl mb-3'>Sign up</div>
        <form>
          <label className='block flex-1 mb-3'>
            <span className='block text-sm font-medium text-slate-700'>
              Name {<Required />}
            </span>
            <input
              type='text'
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
              required
              value={user.name}
              onChange={handleChange('name')}
            />
          </label>
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
          <label className='block flex-1 mb-3'>
            <span className='block text-sm font-medium text-slate-700'>
              Password Confirm {<Required />}
            </span>
            <input
              type='password'
              className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
              required
              min={1}
              max={100000}
              value={user.passwordConfirm}
              onChange={handleChange('passwordConfirm')}
            />
          </label>
        </form>
        <div
          className='mt-4 w-full flex'
          onClick={submitFormHandler}
        >
          <Button
            name='Sign up'
            type={ButtonType.INFO}
          />
        </div>
        <div className='mt-4 text-center'>
          Have an account? &nbsp;
          <span className='font-semibold'>
            <Link to={'/login'}>Login here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

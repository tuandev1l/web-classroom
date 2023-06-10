import { Link } from 'react-router-dom';
import Button from './Button';
import { ButtonType } from '../../enums';

type Props = {};

const Welcome = ({}: Props) => {
  return (
    <div className='flex w-screen h-screen justify-center items-center m-auto'>
      <div className=''>
        <div className='font-bold text-6xl'>Welcome to LTW Library</div>
        <div className='text-center text-2xl mt-6 mb-2 '>
          Buy some interesting books?
        </div>
        <div className='text-center mb-4 text-2xl'>👇</div>
        <div className='flex flex-col gap-2 items-center '>
          <Link to={'/login'}>
            <Button
              name='Login'
              type={ButtonType.SUCCESS}
              cls='w-96'
            />
          </Link>
          <div className='font-bold'>OR</div>
          <Link to={'/signup'}>
            <Button
              name='Sign up'
              type={ButtonType.INFO}
              cls='w-96'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

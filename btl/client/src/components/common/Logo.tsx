import { Book } from 'react-feather';

type Props = {};

const Logo = ({}: Props) => {
  return (
    <div className='flex gap-2 cursor-pointer hover:bg-slate-300 p-2 rounded-md active:scale-95 '>
      <Book />
      <div className='font-semibold'>BTL LTW</div>
    </div>
  );
};

export default Logo;

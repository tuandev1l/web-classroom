import { toast } from 'react-toastify';

type Props = {
  type: Lowercase<keyof typeof toast.TYPE>;
  message: string;
};

const useToast = ({ type, message }: Props) => {
  return toast(message, {
    type,
    position: 'top-right',
    autoClose: type === 'error' ? 5000 : 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    style: { zIndex: 999 },
  });
};

export default useToast;

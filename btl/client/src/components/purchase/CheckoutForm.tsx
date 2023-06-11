import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Button from '../common/Button';
import { ButtonType } from '../../enums';
import useToast from '../../hooks/useToast';

type Props = {};

const CheckoutForm = ({}: Props) => {
  const stripe = useStripe()!;
  const elements = useElements()!;
  const toast = useToast;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/success',
      },
    });

    if (result.error) {
      toast({ type: 'error', message: result.error.message!.split('.')[0] });
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form
        onSubmit={(e) => submitHandler(e)}
        className='w-2/5 h-fit shadow-2xl rounded-xl p-8'
      >
        <PaymentElement />
        <div className='mt-4 flex'>
          <Button
            name='Submit'
            type={ButtonType.INFO}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

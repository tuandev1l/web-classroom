import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useNavigate } from 'react-router-dom';

type Props = {};

const stripePromise = loadStripe(
  'pk_test_51NHL0vIcrSBhhh7hasoidMTiLy5u8YpRdsCFi22uJKW1BTTbuBZnETD3b3qxgzAgpnwntQrMWrnS07ZJkvfr2iq100xkXHzS7N'
);

const Stripe = ({}: Props) => {
  const navigate = useNavigate();

  if (!localStorage.getItem('clientSecret')) {
    return navigate('/books');
  }

  const options = {
    clientSecret: localStorage.getItem('clientSecret')!,
  };

  return (
    <Elements
      stripe={stripePromise}
      options={options}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;

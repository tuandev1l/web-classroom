type Props = {
  handleQuantity: (quantity: number) => void;
  quantity: number;
  bookId?: number;
};

const QuantityBtn = ({ handleQuantity, quantity }: Props) => {
  const decreaseHandler = () => {
    if (quantity > 1) {
      quantity--;
      handleQuantity(quantity);
    }
  };

  const increaseHandler = () => {
    if (quantity < 50) {
      quantity++;
      handleQuantity(quantity);
    }
  };

  return (
    <div className='flex'>
      <button
        onClick={decreaseHandler}
        className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-gray-300 w-6 rounded-l-md text-xl'
        disabled={quantity <= 1}
      >
        -
      </button>
      <div className='w-10 bg-white text-lg p-1 text-center'>{quantity}</div>
      <button
        onClick={increaseHandler}
        className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-6 rounded-r-md bg-gray-300 text-xl'
        disabled={quantity >= 50}
      >
        +
      </button>
    </div>
  );
};

export default QuantityBtn;

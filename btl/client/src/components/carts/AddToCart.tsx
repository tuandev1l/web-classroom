import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { addItemToCart } from '../../apis';
import useToast from '../../hooks/useToast';
import { AppContext } from '../../stores/Provider';
import { IAddToCart, IBook } from '../../types';

type Props = {
  money: number;
  book: IBook;
  title: string;
};

const AddToCart = ({ money, book, title }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const toast = useToast;
  const { addNewItem } = useContext(AppContext);

  const { mutate } = useMutation({
    mutationFn: (item: IAddToCart) => addItemToCart(item),
    onSuccess(_, item) {
      toast({ message: 'Add item to cart', type: 'success' });
      addNewItem(item);
    },
  });

  const addToCartHandler = () => {
    const item: IAddToCart = {
      bookId: book.id,
      quantity,
      money,
      title,
    };
    mutate(item);
  };

  const decreaseHandler = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const increaseHandler = () => {
    if (quantity < 50) {
      setQuantity((q) => q + 1);
    }
  };

  return (
    <div className='mb-4'>
      <div className='font-semibold text-xl'>Buy this book here 👇</div>
      <div className='flex justify-between items-center flex-1 p-8 bg-pink-100 rounded-xl my-4'>
        <div className='font-semibold'>
          Price: <span className='text-orange-500 text-2xl'>{money}</span>
        </div>
        <div>x</div>
        <div className='flex'>
          <button
            onClick={decreaseHandler}
            className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none bg-gray-300 w-6 rounded-l-md text-xl'
            disabled={quantity <= 1}
          >
            -
          </button>
          <div className='w-10 bg-white text-lg p-1 text-center'>
            {quantity}
          </div>
          <button
            onClick={increaseHandler}
            className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-6 rounded-r-md bg-gray-300 text-xl'
            disabled={quantity >= 50}
          >
            +
          </button>
        </div>
        <div>=</div>
        <div className='text-orange-500 text-2xl font-semibold'>
          {quantity * money}
        </div>
        <button
          className='btn btn-success text-white'
          onClick={addToCartHandler}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default AddToCart;

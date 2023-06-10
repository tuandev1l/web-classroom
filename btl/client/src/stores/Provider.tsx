import { createContext, useState } from 'react';
import { IAddToCart } from '../types';

export const AppContext = createContext<IObject>({
  isLoggedin: false,
  items: [],
  handleLoggedIn: () => {},
  addMutipleItems: () => {},
  addNewItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
});

interface Props {
  children: React.ReactNode;
}

interface IObject {
  isLoggedin: boolean;
  items: IAddToCart[];
  handleLoggedIn: () => void;
  addMutipleItems: (newItems: IAddToCart[]) => void;
  addNewItem: ({ bookId, quantity }: IAddToCart) => void;
  removeItem: (bookId: number) => void;
  updateItem: ({ bookId, quantity }: IAddToCart) => void;
}

const Provider: React.FC<Props> = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem('token'));
  const [items, setItems] = useState<IAddToCart[]>([]);

  const addMutipleItems = (newItems: IAddToCart[]) => {
    setItems([...newItems]);
  };

  const addNewItem = ({ bookId, quantity, money, title }: IAddToCart) => {
    const existedItem = items.filter((item) => item.bookId === bookId)[0];
    if (existedItem) {
      existedItem.quantity += quantity;
    } else {
      items.push({ bookId, quantity, money, title });
    }
    setItems([...items]);
  };

  const removeItem = (bookId: number): void => {
    setItems([...items.filter((item) => item.bookId !== bookId)]);
  };

  const updateItem = ({ bookId, quantity }: IAddToCart): void => {
    const existedItem = items.filter((item) => item.bookId === bookId)[0];
    if (existedItem) {
      existedItem.quantity = quantity;
      setItems([...items]);
    }
  };

  const handleLoggedIn = () => {
    setIsLoggedin(!isLoggedin);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedin,
        items,
        handleLoggedIn,
        addMutipleItems,
        addNewItem,
        removeItem,
        updateItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Provider;

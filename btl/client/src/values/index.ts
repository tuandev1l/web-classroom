import { IBook, ICart, ILogin, ISignup, IUser, IUserResponse } from '../types';

export const initBook: IBook = {
  id: 0,
  type: {
    id: 0,
    name: '',
    createdAt: null,
    updatedAt: null,
  },
  title: '',
  author: '',
  published: null,
  description: '',
  numberOfPages: 0,
  money: 0,
  createdAt: null,
  updatedAt: null,
  image: '',
};

export const signupDefault: ISignup = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  address: '',
};

export const loginDefault: ILogin = {
  email: '',
  password: '',
};

export const userResponseDefault: IUserResponse = {
  token: '',
  role: '',
  name: '',
};

export const userDefault: IUser = {
  id: 0,
  role: '',
  name: '',
  email: '',
  address: '',
  createdAt: null,
  updatedAt: null,
};

export const cartDefault: ICart = {
  user: userDefault,
  totalMoney: 0,
  id: 0,
  item: [
    {
      id: 0,
      book: initBook,
      quantity: 0,
      createdAt: null,
      updatedAt: null,
      isCommented: false,
      comment: null,
    },
  ],
  createdAt: null,
  updatedAt: null,
};

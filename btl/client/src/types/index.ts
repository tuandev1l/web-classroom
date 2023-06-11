import { OrderStatus } from '../enums';

export interface IBookType {
  id: number;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IBook {
  id: number;
  type: IBookType;
  title: string;
  author: string;
  description: string;
  published: Date | null;
  numberOfPages: number;
  money: number;
  image: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IErrorReponse {
  data: { message: string };
}

export interface IUserResponse {
  token: string;
  role: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  name: string;
  email: string;
  address: string;
  password: string;
  passwordConfirm: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  address: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IComment {
  id: number;
  message: string;
  rate: number;
  user: IUser;
  book: IBook;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IAddToCart {
  bookId: number;
  quantity: number;
  money: number;
  title: string;
}

export interface ICart {
  id: number;
  user: IUser;
  item: [
    {
      id: number;
      book: IBook;
      quantity: number;
      isCommented: boolean;
      comment: IComment | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
  ];
  totalMoney: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IOrder extends ICart {
  status: OrderStatus;
  expectDelivered: Date | null;
}

export interface ICommentSend {
  rate: number;
  message: string;
  orderId: string;
}

export interface IStatusSend {
  status: string;
}

export interface IStripe {
  amount: number;
  description: string;
}

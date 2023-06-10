import {
  IAddToCart,
  IBook,
  IBookType,
  ICommentSend,
  ILogin,
  ISignup,
  IStatusSend,
} from '../types';
import { instance } from './../utils/axiosConfig';

export const getAllBooks = (limit: number, page: number) =>
  instance.get<IBook[]>(`books?limit=${limit}&page=${page}`);

export const getBookLength = () => instance.get('books/book-length');

export const getBook = (id: string | number) =>
  instance.get<IBook>(`books/${id}`);

export const getBookType = () => instance.get<IBookType>('types');

export const createBook = (book: IBook) =>
  instance.post<IBook>('books', { ...book, type: book.type.id });

export const updateBook = (book: IBook) =>
  instance.patch<IBook>(`books/${book.id}`, { ...book, type: book.type.id });

export const deleteBook = (id: string | number) =>
  instance.delete(`books/${id}`);

export const signupAccount = (user: ISignup) =>
  instance.post('auth/signup', user);

export const loginAccount = (user: ILogin) => instance.post('auth/login', user);

export const getAllComments = (id: string | number) =>
  instance.get(`books/${id}/comments`);

export const addItemToCart = (item: IAddToCart) => instance.post('cart', item);

export const getAllItemsFromCart = () => instance.get('cart');

export const deleteItemFromCart = (bookId: number) =>
  instance.delete(`cart/${bookId}`);

export const updateItemFromCart = (item: IAddToCart) =>
  instance.patch('cart', item);

export const createOrder = () => instance.post('orders');

export const getAllOrders = () => instance.get('orders');

export const getOrderById = (id: string) => instance.get(`orders/${id}`);

export const cancelOrder = (id: string) =>
  instance.patch(`orders/${id}/cancel`);

export const createComment = (id: number, comment: ICommentSend) =>
  instance.post(`books/${id}/comments`, comment);

export const updateComment = (
  bookId: number,
  commentId: number,
  comment: ICommentSend
) => instance.patch(`books/${bookId}/comments/${commentId}`, comment);

export const updateStatusOrder = (id: string, status: IStatusSend) =>
  instance.patch(`orders/${id}`, status);

import { IBook, IBookType } from './../types/index';
export const convertDate = (date: Date | null) => {
  if (date) {
    return new Date(date).toISOString().split('T')[0];
  }
  return '';
};

export const bookDefault: IBook = {
  id: 1,
  type: {
    id: 1,
    name: '',
    createdAt: null,
    updatedAt: null,
  },
  title: '',
  author: '',
  description: '',
  published: null,
  numberOfPages: 0,
  money: 0,
  createdAt: null,
  updatedAt: null,
  image: '',
};

export const bookTypeDefault: IBookType = {
  id: 1,
  name: '',
  createdAt: null,
  updatedAt: null,
};

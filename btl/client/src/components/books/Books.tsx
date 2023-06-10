import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteBook, getAllBooks, getBookLength } from '../../apis';
import { ButtonType, Role } from '../../enums';
import useToast from '../../hooks/useToast';
import { IBook, IErrorReponse } from '../../types';
import { bookDefault, convertDate } from '../../utils';
import Button from '../common/Button';
import Layout from '../common/Layout';

type Props = {};

const LIMIT = 10;

const Books = ({}: Props) => {
  const [books, setBooks] = useState<IBook[]>([bookDefault]);
  const toast = useToast;
  const queryClient = useQueryClient();
  const isAdmin = localStorage.getItem('role') === Role.ADMIN;
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(0);

  useQuery({
    queryKey: ['books', page],
    queryFn: () => getAllBooks(LIMIT, page),
    keepPreviousData: true,
    onSuccess(data: AxiosResponse) {
      setBooks(data.data);
    },
    onError(err: AxiosError) {
      toast({
        type: 'error',
        message: (err.response as IErrorReponse).data.message,
      });
    },
  });

  useQuery({
    queryKey: ['books-length'],
    queryFn: getBookLength,
    onSuccess(data: AxiosResponse) {
      setNumberOfPage(data.data);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (id: string | number) => deleteBook(id),
    onSuccess() {
      toast({ type: 'success', message: 'Delete book successfully' });
      queryClient.invalidateQueries(['books']);
    },
    onError(err: AxiosError) {
      toast({
        type: 'error',
        message: (err.response as IErrorReponse).data.message,
      });
    },
  });

  const deleteBookHandler = (id: string | number) => {
    mutate(id);
  };

  const changePageHandler = (val: number) => {
    setPage(val);
  };

  return (
    <Layout>
      <div className='overflow-x-auto mt-4 px-4'>
        <div className='flex justify-between mb-4'>
          <div className='form-control'>
            <div className='input-group'>
              <input
                type='text'
                placeholder='Search…'
                className='input input-bordered h-8 '
              />
              <button className='btn btn-square min-h-8 h-8 w-10 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
          {isAdmin && (
            <Link to={'/books/add'}>
              <Button
                type={ButtonType.SUCCESS}
                name='Add book'
              />
            </Link>
          )}
        </div>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>Pages</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, idx) => (
              <tr key={book.id}>
                <th>{idx + 1}</th>
                <td className='max-w-sm'>{book.title}</td>
                <td>{book.author}</td>
                <td>{convertDate(book.published)}</td>
                <td>{book.numberOfPages}</td>
                <td>
                  {
                    <div className='flex gap-2'>
                      <Link to={`/books/${book.id}`}>
                        <Button
                          name='View'
                          type={ButtonType.INFO}
                        />
                      </Link>
                      {isAdmin && (
                        <div onClick={() => deleteBookHandler(book.id)}>
                          <Button
                            name='Delete'
                            type={ButtonType.ERROR}
                          />
                        </div>
                      )}
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='join flex justify-center items-center my-8 '>
          {new Array(Math.ceil(numberOfPage / LIMIT)).fill(0).map((_, idx) => (
            <input
              key={idx + 1}
              className='join-item btn btn-square'
              type='radio'
              name='options'
              aria-label={`${idx + 1}`}
              checked={idx === page - 1}
              onChange={() => changePageHandler(idx + 1)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Books;

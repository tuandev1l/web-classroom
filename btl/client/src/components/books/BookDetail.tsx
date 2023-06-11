import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { createBook, getBook, getBookType, updateBook } from '../../apis';
import { ButtonType, Role } from '../../enums';
import useToast from '../../hooks/useToast';
import { IBook, IBookType, IErrorReponse } from '../../types';
import { bookDefault, bookTypeDefault, convertDate } from '../../utils';
import AddToCart from '../carts/AddToCart';
import Comments from '../comments/Comments';
import Button from '../common/Button';
import Layout from '../common/Layout';
import Required from '../common/Required';

type Props = {};

const BookDetail = ({}: Props) => {
  const isAddMode = useMatch('/books/add');
  const [book, setBook] = useState<IBook>(bookDefault);
  const [isViewMode, setIsViewMode] = useState(isAddMode ? false : true);
  const [bookTypes, setBookTypes] = useState<IBookType[]>([bookTypeDefault]);
  const toast = useToast;
  const navigate = useNavigate();
  const params = useParams();
  const isAdmin = localStorage.getItem('role') === Role.ADMIN;
  const id = params.id!;
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState('');

  const bookCoverHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);

    return () => URL.revokeObjectURL(url!);
  }, [selectedFile]);

  useQuery({
    queryKey: ['bookTypes'],
    queryFn: getBookType,
    onSuccess(data: AxiosResponse) {
      setBookTypes(data.data);
    },
  });

  const createBookMutation = useMutation({
    mutationFn: (book: IBook) => createBook(book),
    onSuccess() {
      toast({ type: 'success', message: 'Create book successfully' });
      navigate('/books');
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message:
          (error.response as IErrorReponse).data.message ||
          'Can not create book, please try again',
      });
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: (book: IBook) => updateBook(book),
    onSuccess() {
      toast({ type: 'success', message: 'Update book successfully' });
      navigate('/books');
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message:
          (error.response as IErrorReponse).data.message ||
          'Can not update this book, please try again',
      });
    },
  });

  const handleChange = (
    prop: keyof IBook,
    value: string | number | IBookType
  ) => {
    setBook({ ...book, [prop]: value });
  };

  const isValidateBook = () => {
    let isValid = true;
    if (!book.author) {
      toast({ type: 'error', message: 'Author is not empty' });
      isValid = false;
    }
    if (!book.title) {
      toast({ type: 'error', message: 'Title is not empty' });
      isValid = false;
    }
    if (!book.description) {
      toast({ type: 'error', message: 'Description is not empty' });
      isValid = false;
    }
    if (!book.published) {
      toast({ type: 'error', message: 'Published must be day' });
      isValid = false;
    }
    if (!book.numberOfPages) {
      toast({ type: 'error', message: 'Pages must be above 0' });
      isValid = false;
    }
    if (isAddMode && !selectedFile) {
      toast({ type: 'error', message: 'Book must have cover' });
      isValid = false;
    }
    return isValid;
  };

  const submitFormHandler = async () => {
    if (!isValidateBook()) return;

    if (isAddMode) {
      if (!book.image) {
        const formData = new FormData();
        formData.append('file', selectedFile!);
        formData.append('upload_preset', 'qivjqog9');

        const data = await axios.post(
          'https://api.cloudinary.com/v1_1/dfa7qyx7z/upload',
          formData
        );
        handleChange('image', data.data.url);
      }
      return createBookMutation.mutate(book);
    } else if (isViewMode) {
      return setIsViewMode(false);
    }
    updateBookMutation.mutate(book);
  };

  useQuery({
    queryKey: ['books', id],
    queryFn: () => getBook(id),
    onSuccess(data: AxiosResponse) {
      setBook(data.data);
      console.log(data.data);
    },
    onError(err: AxiosError) {
      toast({
        type: 'error',
        message: (err.response as IErrorReponse).data.message,
      });
    },
    enabled: !isAddMode,
  });

  return (
    <Layout>
      <div className='flex px-2 my-2 gap-8 items-center'>
        <div className='book__info flex-1'>
          <form>
            <div className='flex gap-4 title__author'>
              <label className='block flex-1 '>
                <span className='block text-sm font-medium text-slate-700'>
                  Title {<Required />}
                </span>
                <input
                  type='text'
                  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                  required
                  value={book.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  disabled={isViewMode ? true : false}
                />
              </label>
              <label className='block flex-1'>
                <span className='block text-sm font-medium text-slate-700'>
                  Author {<Required />}
                </span>
                <input
                  type='text'
                  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                  required
                  value={book.author}
                  onChange={(e) => handleChange('author', e.target.value)}
                  disabled={isViewMode ? true : false}
                />
              </label>
            </div>
            <label className='block flex-1 my-4'>
              <span className='block text-sm font-medium text-slate-700'>
                Description {<Required />}
              </span>
              <textarea
                className='mt-1 block w-full max-h-52 resize-none px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                required
                value={book.description}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={isViewMode ? true : false}
              />
            </label>
            <div className='flex gap-4 published__pages'>
              <label className='block flex-1 '>
                <span className='block text-sm font-medium text-slate-700'>
                  Published {<Required />}
                </span>
                <input
                  type='date'
                  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                  max={new Date().toISOString().split('T')[0]}
                  required
                  value={convertDate(book.published)}
                  onChange={(e) => handleChange('published', e.target.value)}
                  disabled={isViewMode ? true : false}
                />
              </label>
              <label className='block flex-1'>
                <span className='block text-sm font-medium text-slate-700'>
                  Number of Page {<Required />}
                </span>
                <input
                  type='number'
                  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                  required
                  min={1}
                  max={100000}
                  value={book.numberOfPages}
                  disabled={isViewMode ? true : false}
                  onChange={(e) =>
                    handleChange('numberOfPages', +e.target.value)
                  }
                />
              </label>
            </div>
            <div className='flex gap-4 published__pages mt-4'>
              <label className='block flex-1'>
                <span className='block text-sm font-medium text-slate-700'>
                  Book type {<Required />}
                </span>
                <select
                  className='mt-1 w-40 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                  value={book.type.name}
                  onChange={(e) =>
                    handleChange(
                      'type',
                      bookTypes.filter(
                        (type) => type.name === e.target.value
                      )[0]
                    )
                  }
                  required
                  disabled={isViewMode ? true : false}
                >
                  {bookTypes?.map((type) => (
                    <option
                      key={type.id}
                      value={type.name}
                      className=''
                    >
                      {type.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className='block flex-1'>
                <span className='block text-sm font-medium text-slate-700'>
                  Price {<Required />}
                </span>
                <input
                  type='number'
                  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none :border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
                  required
                  min={1}
                  max={100000}
                  value={book.money}
                  disabled={isViewMode ? true : false}
                  onChange={(e) => handleChange('money', +e.target.value)}
                />
              </label>
            </div>
          </form>
          {isAdmin && (
            <div
              className='mt-4 w-full flex'
              onClick={submitFormHandler}
            >
              <Button
                name={isAddMode ? 'Add' : isViewMode ? 'Edit' : 'Submit'}
                type={ButtonType.INFO}
              />
            </div>
          )}
        </div>
        <div className='book__img flex flex-col justify-center items-center'>
          {isAdmin && (
            <input
              type='file'
              className='file-input file-input-bordered file-input-info w-full max-w-xs'
              onChange={bookCoverHandler}
            />
          )}
          <div className='flex mt-4 h-96 '>
            <img src={preview || book.image} />
          </div>
        </div>
      </div>
      {!isAddMode && (
        <>
          <AddToCart
            money={book.money}
            book={book}
            title={book.title}
          />
          <Comments id={params.id!} />
        </>
      )}
    </Layout>
  );
};

export default BookDetail;

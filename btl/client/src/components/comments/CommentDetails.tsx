import { useState } from 'react';
import { ButtonType } from '../../enums';
import useToast from '../../hooks/useToast';
import { IRating } from '../../orders/ItemDetail';
import { IComment } from '../../types';
import { convertDate } from '../../utils';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Rating from '../common/Rating';

type Props = {
  show: boolean;
  imgUrl: string;
  title: string;
  type: string;
  author: string;
  published: Date | null;
  money: number;
  handleCloseModal: () => void;
  mutate: unknown;
  bookId: number;
  orderId: string;
  comment: IComment | null;
};

const CreateComment = ({
  show,
  imgUrl,
  title,
  type,
  author,
  published,
  money,
  handleCloseModal,
  mutate,
  bookId,
  orderId,
  comment,
}: Props) => {
  const [rating, setRating] = useState(comment?.rate);
  const [message, setMessage] = useState(comment?.message);
  const toast = useToast;

  const commentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const ratingHandler = (val: number) => {
    setRating(val);
  };

  const isValidComment = () => {
    let isValid = true;
    if (!message) {
      toast({ type: 'error', message: 'Comment must be at least 1 character' });
      isValid = false;
    }
    if (!rating) {
      toast({ type: 'error', message: 'Rating must be above 0' });
      isValid = false;
    }
    return isValid;
  };

  const saveComment = () => {
    if (!isValidComment()) return;
    const cmt: IRating = {
      bookId,
      comment: {
        rate: rating!,
        message: message!,
        orderId,
      },
      commentId: comment?.id,
    };
    (mutate as Function)(cmt);
  };

  return (
    <Modal
      show={show}
      handleCloseModal={handleCloseModal}
    >
      <div className='flex justify-start items-center gap-2 flex-1'>
        <div className='w-40 h-40'>
          <img src={imgUrl} />
        </div>
        <div className='flex flex-col gap-2'>
          <div>Title: {title}</div>
          <div>Author: {author}</div>
          <div>Price: {money}</div>
          <div>Published: {convertDate(published)}</div>
          <div>Type: {type}</div>
        </div>
      </div>
      <div className='mt-4 flex-1'>
        <div className='flex items-center justify-start gap-4'>
          <div>Rating:</div>
          <Rating
            edit={true}
            rate={rating || 0}
            ratingHandler={ratingHandler}
            size={28}
          />
        </div>
        <textarea
          className='textarea textarea-bordered w-full mt-2 h-28 resize-none leading-5 px-3'
          placeholder='Write your comment here'
          onChange={commentChangeHandler}
          value={message}
        ></textarea>
        <div className='flex justify-center items-center gap-4 mt-4'>
          <div
            className='flex flex-1'
            onClick={handleCloseModal}
          >
            <Button
              name='Back'
              type={ButtonType.INFO}
            />
          </div>
          <div
            className='flex flex-1'
            onClick={saveComment}
          >
            <Button
              name='Save'
              type={ButtonType.SUCCESS}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateComment;

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createComment, updateComment } from '../apis';
import CreateComment from '../components/comments/CommentDetails';
import Button from '../components/common/Button';
import { ButtonType } from '../enums';
import useToast from '../hooks/useToast';
import { IComment, ICommentSend, IErrorReponse } from '../types';
import { AxiosError } from 'axios';

type Props = {
  idx: number;
  title: string;
  type: string;
  money: number;
  quantity: number;
  isSuccessfulOrder: boolean;
  isCommented: boolean;
  author: string;
  published: Date | null;
  bookId: number;
  orderId: string;
  comment: IComment | null;
  image: string;
};

export interface IRating {
  bookId: number;
  commentId?: number;
  comment: ICommentSend;
}

const ItemDetail = ({
  idx,
  title,
  type,
  money,
  quantity,
  isSuccessfulOrder,
  isCommented,
  author,
  published,
  bookId,
  orderId,
  comment,
  image,
}: Props) => {
  const [show, setShow] = useState(false);
  const [commented, setCommented] = useState(isCommented);
  const toast = useToast;

  const showModalHandler = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const { mutate: createCommentMutate } = useMutation({
    mutationFn: ({ bookId, comment }: IRating) =>
      createComment(bookId, comment),
    onSuccess() {
      toast({ type: 'success', message: 'Rating sucessfully' });
      handleCloseModal();
      setCommented(true);
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message:
          (error.response as IErrorReponse).data.message ||
          'Can not create comment, please try again',
      });
    },
  });

  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: ({ bookId, comment, commentId }: IRating) =>
      updateComment(bookId, commentId!, comment),
    onSuccess() {
      toast({ type: 'success', message: 'Update Rating sucessfully' });
      handleCloseModal();
      setCommented(true);
    },
    onError(error: AxiosError) {
      toast({
        type: 'error',
        message:
          (error.response as IErrorReponse).data.message ||
          'Can not update this item, please try again',
      });
    },
  });

  return (
    <>
      <tr>
        <th>{idx + 1}</th>
        <td>{title}</td>
        <td>{money}</td>
        <td>{quantity}</td>
        <td>{money * quantity}</td>
        {isSuccessfulOrder && (
          <td
            className='flex'
            onClick={showModalHandler}
          >
            {commented ? (
              <Button
                name='View Rating'
                type={ButtonType.WARNING}
              />
            ) : (
              <div onClick={showModalHandler}>
                <Button
                  name='Rating'
                  type={ButtonType.WARNING}
                />
              </div>
            )}
          </td>
        )}
      </tr>
      <CreateComment
        handleCloseModal={handleCloseModal}
        show={show}
        imgUrl={image}
        title={title}
        type={type}
        money={money}
        author={author}
        published={published}
        mutate={isCommented ? updateCommentMutate : createCommentMutate}
        bookId={bookId}
        orderId={orderId}
        comment={comment}
      />
    </>
  );
};

export default ItemDetail;

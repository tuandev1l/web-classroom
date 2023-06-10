import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createComment, updateComment } from '../apis';
import CreateComment from '../components/comments/CommentDetails';
import Button from '../components/common/Button';
import { ButtonType } from '../enums';
import useToast from '../hooks/useToast';
import { IComment, ICommentSend } from '../types';

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
  });

  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: ({ bookId, comment, commentId }: IRating) =>
      updateComment(bookId, commentId!, comment),
    onSuccess() {
      toast({ type: 'success', message: 'Update Rating sucessfully' });
      handleCloseModal();
      setCommented(true);
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
        imgUrl={
          'https://upload.wikimedia.org/wikipedia/vi/3/3d/T%C3%B4i_th%E1%BA%A5y_hoa_v%C3%A0ng_tr%C3%AAn_c%E1%BB%8F_xanh.jpg'
        }
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

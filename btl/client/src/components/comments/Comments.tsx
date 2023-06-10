import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { getAllComments } from '../../apis';
import { IComment } from '../../types';
import Rating from '../common/Rating';

type Props = {
  id: string | number;
};

const Comments = ({ id }: Props) => {
  const [comments, setComments] = useState<IComment[]>();
  useQuery({
    queryKey: ['comments', id],
    queryFn: () => getAllComments(id),
    onSuccess(data: AxiosResponse) {
      setComments(data.data);
    },
  });
  return (
    <div className='w-full'>
      {comments?.length ? (
        comments?.map((comment) => (
          <div
            className='flex mb-4 gap-2'
            key={comment.id}
          >
            <div className='w-16 h-16'>
              <img src='https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg' />
            </div>
            <div className='mt-1'>
              <div>{comment.user.name}</div>
              <div>
                <Rating
                  rate={comment.rate}
                  edit={false}
                />
              </div>
              <div>{new Date(comment.createdAt!).toLocaleString()}</div>
              <div>{comment.message}</div>
            </div>
          </div>
        ))
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center h-24 text-xl font-semibold '>
          <div>No comment yet :((</div>
        </div>
      )}
    </div>
  );
};

export default Comments;

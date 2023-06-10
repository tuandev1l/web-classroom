import ReactStars from 'react-stars';

type Props = {
  rate: number;
  edit: boolean;
  size?: number;
  ratingHandler?: (val: number) => void;
};

const Rating = ({ rate, edit, ratingHandler, size }: Props) => {
  const ratingChangeHandler = (val: number) => {
    if (ratingHandler) ratingHandler(val);
  };

  return (
    <div className='-mx-1'>
      <ReactStars
        count={5}
        size={size || 20}
        color2={'#fcd53f'}
        color1={'#ececec'}
        value={rate}
        half={true}
        edit={edit}
        onChange={ratingChangeHandler}
      />
    </div>
  );
};

export default Rating;

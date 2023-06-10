import { ButtonType } from '../../enums';

type Props = {
  name: string;
  type: ButtonType;
  cls?: string;
};

const Button = ({ name, type, cls }: Props) => {
  return (
    <button className={`btn btn-${type} min-h-0 h-8 flex-1 ${cls ? cls : ''}`}>
      {name}
    </button>
  );
};

export default Button;

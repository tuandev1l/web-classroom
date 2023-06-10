import { ButtonType } from '../../enums';
import Button from './Button';
import Modal from './Modal';

type Props = {
  show: boolean;
  handleCloseModal: () => void;
  message: string;
  messageDisagree: string;
  messageAgree: string;
  action: () => void;
};

const Confirm = ({
  show,
  handleCloseModal,
  message,
  messageDisagree,
  messageAgree,
  action,
}: Props) => {
  return (
    <Modal
      show={show}
      handleCloseModal={handleCloseModal}
      width={480}
      height={120}
    >
      <div>{message}</div>
      <div className='flex flex-1 justify-center items-center gap-2 mt-4'>
        <div
          className='flex flex-1'
          onClick={handleCloseModal}
        >
          <Button
            name={messageDisagree}
            type={ButtonType.INFO}
          />
        </div>
        <div
          className='flex flex-1'
          onClick={action}
        >
          <Button
            name={messageAgree}
            type={ButtonType.INFO}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;

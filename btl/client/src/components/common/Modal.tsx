import React from 'react';
import ReactModal from 'react-modal';

type Props = {
  children: React.ReactNode;
  show: boolean;
  handleCloseModal: () => void;
  width?: number;
  height?: number;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'normal';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'normal';
};

const Modal = ({
  children,
  show,
  handleCloseModal,
  width = 600,
  height = 480,
  justifyContent = 'center',
  alignItems = 'normal',
}: Props) => {
  return (
    <ReactModal
      isOpen={show}
      contentLabel='Minimal Modal Example'
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.1)',
          zIndex: 999,
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          justifyContent: `${justifyContent}`,
          alignItems: `${alignItems}`,
          flexDirection: 'column',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;

import React from 'react';
import './ModalWindow.css';

type ModalWindowProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

function ModalWindow({
  active,
  setActive,
  children,
}: ModalWindowProps): JSX.Element {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;

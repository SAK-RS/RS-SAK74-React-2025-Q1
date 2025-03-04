import { useEffect, useRef, type FC, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:backdrop-blur-sm bg-transparent m-auto overflow-hidden outline-0"
    >
      {children}
    </dialog>,
    document.body
  );
};

export default Modal;

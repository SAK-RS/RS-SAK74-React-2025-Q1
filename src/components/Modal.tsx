import {
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { createPortal } from 'react-dom';

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isRendered, setIsrendered] = useState(false);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, [isRendered]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsrendered(true);
    }
  }, []);

  return !isRendered
    ? null
    : createPortal(
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

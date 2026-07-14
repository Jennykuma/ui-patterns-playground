import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  /** Heading displayed at the top of the modal */
  title?: string;
  /** Body text inside the modal */
  description?: string;
}

/** Modal dialog that closes on Escape or backdrop click, with focus restoration on close */
const Modal = ({
  title = 'Modal title',
  description = 'This is the modal description!',
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen]);

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const openModal = () => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (previousFocus.current) {
      previousFocus.current.focus();
    }
  };

  return (
    <>
      <button
        className="bg-primary hover:bg-primary-hover transition-colors duration-200 p-1.5 rounded-md text-sm font-semibold text-white cursor-pointer"
        onClick={openModal}
      >
        Open modal
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={backdropRef}
            className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600/50"
            onClick={closeModal}
          >
            <div
              className="rounded-lg p-8 w-1/3 bg-white"
              role="dialog"
              onClick={(e) => e.stopPropagation()}
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <span id="modal-title" className="text-2xl">
                {title}
              </span>
              <p className="mt-5">{description}</p>
              <div className="flex float-right">
                <button
                  className={`
                  border border-primary text-primary hover:bg-primary/10
                  transition-colors duration-200 font-semibold
                  text-sm mt-4 px-2 py-1.5 rounded-md cursor-pointer
                `}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;

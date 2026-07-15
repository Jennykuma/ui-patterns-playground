import {
  useEffect,
  useRef,
  useId,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

interface ModalProps {
  /** Whether the modal is currently open. This component is fully controlled. The consumer owns this state. */
  isOpen: boolean;
  /** Called when the modal requests to close (Escape key, backdrop click, or a consumer-triggered close). */
  onClose: () => void;
  /** Whether clicking the backdrop closes the modal. Disable for destructive confirmations to prevent accidental dismissal. */
  closeOnOverlayClick?: boolean;
  /** Compose `Modal.Header`, `Modal.Body`, and `Modal.Footer` here. */
  children: ReactNode;
}

interface ModalContextValue {
  titleId: string;
  onClose: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal.* components must be used inside <Modal>');
  return ctx;
};

/**
 * Compound modal dialog: `Modal`, `Modal.Header`, `Modal.Body`, `Modal.Footer`.
 *
 * Renders via a portal to `document.body`, traps Tab focus inside the dialog,
 * locks page scroll while open, and restores focus to the trigger element on close.
 */
const Modal = ({
  isOpen,
  onClose,
  closeOnOverlayClick = true,
  children,
}: ModalProps) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef<string>('');
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    // Capture the trigger button
    previousFocus.current = document.activeElement as HTMLElement | null;

    // Record the previous overflow setting so we can revert back to it when the modal closes
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus on the dialog when the modal is opened
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow.current;
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const focusableEls = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a, input, textarea, select, [tabIndex]:not([tabIndex="-1"])'
      );

      if (e.key === 'Tab' && focusableEls) {
        if (e.shiftKey) {
          if (document.activeElement === focusableEls[0]) {
            e.preventDefault();
            focusableEls[focusableEls.length - 1].focus();
          }
        } else if (
          document.activeElement === focusableEls[focusableEls.length - 1]
        ) {
          e.preventDefault();
          focusableEls[0].focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen &&
        createPortal(
          // Escape key already provides a keyboard-accessible close path; backdrop click is a mouse/touch-only convenience
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            ref={backdropRef}
            className="fixed inset-0 flex flex-col justify-center items-center bg-gray-600/50"
            onClick={closeOnOverlayClick ? onClose : () => {}}
          >
            <ModalContext.Provider value={{ titleId, onClose }}>
              {/* This click handler only stops propagation to the backdrop; it isn't itself a user-facing action needing a keyboard equivalent */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div
                ref={dialogRef}
                tabIndex={-1}
                className="rounded-lg p-8 w-1/3 bg-white"
                role="dialog"
                onClick={(e) => e.stopPropagation()}
                aria-modal="true"
                aria-labelledby={titleId}
              >
                {children}
              </div>
            </ModalContext.Provider>
          </div>,
          document.body
        )}
    </>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

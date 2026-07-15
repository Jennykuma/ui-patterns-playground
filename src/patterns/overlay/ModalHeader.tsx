import { type ReactNode } from 'react';
import { useModalContext } from './Modal';

interface ModalHeaderProps {
  /** Title content. Rendered with the `id` that the dialog's `aria-labelledby` points at. */
  children: ReactNode;
}

/** Modal title. Must be used inside a `<Modal>`. */
const ModalHeader = ({ children }: ModalHeaderProps) => {
  const { titleId } = useModalContext();

  return (
    <h1 id={titleId} className="text-xl">
      {children}
    </h1>
  );
};

export default ModalHeader;

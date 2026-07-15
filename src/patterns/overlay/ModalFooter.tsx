import { type ReactNode } from 'react';

interface ModalFooterProps {
  /** Footer content — typically action buttons. Layout/alignment is left to the consumer. */
  children: ReactNode;
}

/** Modal footer, usually for action buttons. */
const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div>{children}</div>;
};

export default ModalFooter;

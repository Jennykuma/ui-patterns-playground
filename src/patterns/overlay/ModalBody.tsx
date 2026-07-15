import { type ReactNode } from 'react';

interface ModalBodyProps {
  /** Main modal content. */
  children: ReactNode;
}

/** Modal body/content area. */
const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="text-sm">{children}</div>;
};

export default ModalBody;

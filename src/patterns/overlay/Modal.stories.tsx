import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import Modal from './Modal';

const meta = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '400px' } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          className="bg-primary hover:bg-primary-hover transition-colors duration-200 p-1.5 rounded-md text-sm font-semibold text-white cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Open modal
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Header>Modal title</Modal.Header>
          <Modal.Body>Modal body</Modal.Body>
          <Modal.Footer>
            <div className="flex float-right gap-2">
              <button
                className={`
                  border border-primary text-primary hover:bg-primary/10
                  transition-colors duration-200 font-semibold
                  text-sm mt-4 px-2 py-1.5 rounded-md cursor-pointer
                `}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button
                className={`
                  border border-primary bg-primary hover:bg-primary-hover
                  text-white transition-colors duration-200 font-semibold
                  text-sm mt-4 px-2 py-1.5 rounded-md cursor-pointer
                `}
                onClick={() => setIsOpen(false)}
              >
                Main Action
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

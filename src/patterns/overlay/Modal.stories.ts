import type { Meta, StoryObj } from '@storybook/react-vite';
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
		title: 'Modal title',
		description: 'This is the modal description!',
	},
};

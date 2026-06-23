import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from './Toast';

const meta = {
	title: 'Overlay/Toast',
	component: Toast,
	parameters: {
		layout: 'fullscreen',
		docs: { story: { height: '200px' } },
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		duration: 3000,
	},
};

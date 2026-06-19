import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from './Tooltip';

const meta = {
	title: 'Overlay/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'fullscreen',
		docs: { story: { height: '150px' } },
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		text: 'This is a tooltip!',
		label: 'Hover over me!',
	},
};

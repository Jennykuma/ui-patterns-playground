import type { Meta, StoryObj } from '@storybook/react-vite';
import KeyboardToggle from './KeyboardToggle';

const meta = {
	title: 'Input/KeyboardToggle',
	component: KeyboardToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof KeyboardToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: 'Keyboard Toggle',
		defaultChecked: true,
	},
};

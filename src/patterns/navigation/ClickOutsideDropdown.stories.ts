import type { Meta, StoryObj } from '@storybook/react-vite';
import ClickOutsideDropdown from './ClickOutsideDropdown';

const meta = {
	title: 'Navigation/ClickOutsideDropdown',
	component: ClickOutsideDropdown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ClickOutsideDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		items: ['Item 1', 'Item 2', 'Item 3'],
	},
};

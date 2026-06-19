import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs from './Tabs';

const meta = {
	title: 'Navigation/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
		defaultTab: 0,
	},
};

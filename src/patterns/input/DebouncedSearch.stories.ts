import type { Meta, StoryObj } from '@storybook/react-vite';
import DebouncedSearch from './DebouncedSearch';

const meta = {
	title: 'Input/DebouncedSearch',
	component: DebouncedSearch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DebouncedSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		delay: 300,
		placeholder: 'Search something...',
		disabled: false,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		placeholder: 'Read-only input',
		readOnly: true,
	},
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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

export const Loading: Story = {
	args: {
		loading: true,
		delay: 800,
	},
	render: (args) => {
		const [loading, setLoading] = useState(false);
		const handleSearch = () => {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, args.delay);
		};
		return (
			<DebouncedSearch
				{...args}
				onSearch={handleSearch}
				loading={loading}
			/>
		);
	},
};

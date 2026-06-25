import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from './Tooltip';

const meta = {
	title: 'Overlay/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
		docs: { story: { height: '400px' } },
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '200px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Story />
			</div>
		),
	],
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

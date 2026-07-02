import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';

const meta = {
	title: 'Navigation/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered',
		docs: { story: { height: '400px' } },
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

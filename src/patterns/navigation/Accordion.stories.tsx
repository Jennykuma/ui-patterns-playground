import type { Meta, StoryObj } from '@storybook/react-vite';
import Accordion from './Accordion';

const meta = {
  title: 'Navigation/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      story: { height: '400px' },
      description: {
        component:
          'A vertically stacked set of collapsible sections, where only one section is expanded at a time. Each header is a button wrapped in a heading element, linked to its panel via `aria-controls`/`aria-labelledby`, and supports full keyboard navigation (Tab, Shift+Tab, Space/Enter).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

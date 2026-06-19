import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-onboarding',
	],
	framework: '@storybook/react-vite',
	viteFinal: async (config: InlineConfig) => {
		config.base = '/ui-patterns-playground/';
		return config;
	},
	docs: {
		//👇 See the table below for the list of supported options
		defaultName: 'Documentation',
		docsMode: true,
	},
};
export default config;

import { reactMonorepoBoilerplateModifier } from './modifiers/react-monorepo-boilerplate/index.js';
import { reactNostalgiaBoilerplateModifier } from './modifiers/react-nostalgia-boilerplate/index.js';
import { reactUiBoilerplateModifier } from './modifiers/react-ui-boilerplate/index.js';
import type { Boilerplate } from './types.js';

export const boilerplates: Boilerplate[] = [
	{
		name: 'react-nostalgia-boilerplate',
		repo: 'https://github.com/boilertowns/react-nostalgia-boilerplate',
		modifier: reactNostalgiaBoilerplateModifier,
		scripts: ['dev'],
	},
	{
		name: 'react-ui-boilerplate',
		repo: 'https://github.com/boilertowns/react-ui-boilerplate',
		modifier: reactUiBoilerplateModifier,
		scripts: ['storybook'],
	},
	{
		name: 'react-monorepo-boilerplate',
		repo: 'https://github.com/boilertowns/react-monorepo-boilerplate',
		modifier: reactMonorepoBoilerplateModifier,
		scripts: ['build', 'dev'],
	},
];

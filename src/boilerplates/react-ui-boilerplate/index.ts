import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-ui-boilerplate',
	hint: 'Typescript, React, Emotion, Rollup, Babel',
	repo: 'https://github.com/boilertowns/react-ui-boilerplate',
	scripts: ['storybook'],
	modifier,
};

export default boilerplates;

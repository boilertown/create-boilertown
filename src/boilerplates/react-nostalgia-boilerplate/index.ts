import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-nostalgia-boilerplate',
	hint: 'Typescript, React, React Router v6, Styled-components, Babel, Webpack',
	repo: 'https://github.com/boilertown/react-nostalgia-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

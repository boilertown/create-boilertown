import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-module-federation-boilerplate',
	hint: 'Monorepo with Nx, Typescript, React, React Router v6, Webpack and Module Federation',
	repo: 'https://github.com/boilertowns/react-module-federation-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

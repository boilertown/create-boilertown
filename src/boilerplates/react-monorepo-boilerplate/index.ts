import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-monorepo-boilerplate',
	repo: 'https://github.com/boilertowns/react-monorepo-boilerplate',
	scripts: ['build', 'dev'],
	modifier,
};

export default boilerplates;

import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-nostalgia-boilerplate',
	repo: 'https://github.com/boilertowns/react-nostalgia-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-minimal-boilerplate',
	repo: 'https://github.com/boilertowns/react-minimal-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

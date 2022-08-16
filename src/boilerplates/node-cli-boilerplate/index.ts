import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'node-cli-boilerplate',
	repo: 'https://github.com/boilertowns/node-cli-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

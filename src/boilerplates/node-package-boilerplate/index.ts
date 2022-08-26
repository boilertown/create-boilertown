import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'node-package-boilerplate',
	hint: 'Typescript, Rollup, Vitest',
	repo: 'https://github.com/boilertowns/node-package-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

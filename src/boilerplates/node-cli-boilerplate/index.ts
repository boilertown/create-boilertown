import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'node-cli-boilerplate',
	hint: 'Typescript, tsup, Vitest',
	repo: 'https://github.com/boilertown/node-cli-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-minimal-v2-boilerplate',
	hint: 'Typescript, Vite, Vitest, React, React Router v6, Tailwind CSS with @antfu/eslint-config',
	repo: 'https://github.com/boilertowns/react-minimal-v2-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-minimal-boilerplate',
	hint: 'Typescript, Vite, Vitest, React, React Router v6, Tailwind CSS',
	repo: 'https://github.com/boilertowns/react-minimal-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

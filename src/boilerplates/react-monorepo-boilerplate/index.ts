import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-monorepo-boilerplate',
	hint: 'Monorepo, Typescript, Turborepo, React, React Router v6, Next.js, Rollup, Babel, Webpack',
	repo: 'https://github.com/boilertowns/react-monorepo-boilerplate',
	scripts: ['build', 'dev'],
	modifier,
};

export default boilerplates;

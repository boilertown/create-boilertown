import type { Boilerplate } from 'types/index.js';
import { modifier } from './modifier.js';

const boilerplates: Boilerplate = {
	name: 'react-parcel-boilerplate',
	hint: 'Typescript, React, React Router v6, Parcel, Tailwind CSS',
	repo: 'https://github.com/boilertowns/react-parcel-boilerplate',
	scripts: ['dev'],
	modifier,
};

export default boilerplates;

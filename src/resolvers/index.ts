import { test } from './test';
import { signup } from './signup';
import { login } from './login';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test
	},
	Mutation: {
		signup,
		login
	}
};

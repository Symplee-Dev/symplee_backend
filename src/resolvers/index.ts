import { test } from './test';
import { signup } from './signup';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test
	},
	Mutation: {
		signup
	}
};

import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers } from './user';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test
	},
	Mutation: {
		signup,
		login
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user } from './user';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user
	},
	Mutation: {
		signup,
		login
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

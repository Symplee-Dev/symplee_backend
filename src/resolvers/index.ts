import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user } from './user';
import { verifyEmail } from './verifyEmail';
import { addNewChangeLog } from './addNewChangeLog';
import { changeLogById } from './changeLog';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		changeLogById
	},
	Mutation: {
		addNewChangeLog,
		signup,
		login,
		verifyEmail
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

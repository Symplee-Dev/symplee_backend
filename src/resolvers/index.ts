import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user } from './user';
import { verifyEmail } from './verifyEmail';
import {
	changeLogById,
	changeLogs,
	addNewChangeLog,
	editChangeLog
} from './changeLog';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		changeLogById,
		changeLogs
	},
	Mutation: {
		addNewChangeLog,
		signup,
		login,
		verifyEmail,
		editChangeLog
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

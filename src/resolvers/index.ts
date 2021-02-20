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
import { serverStatus } from './serverStatus';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		changeLogById,
		changeLogs,
		serverStatus
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

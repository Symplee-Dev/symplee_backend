import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user } from './user';
import { verifyEmail } from './verifyEmail';
import { createChatGroup } from './createChatGroup';
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
		createChatGroup,
		editChangeLog
		verifyEmail
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

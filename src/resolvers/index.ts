import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user } from './user';
import { verifyEmail } from './verifyEmail';
import { createChatGroup } from './createChatGroup';
import { chatGroup } from './chatGroup';
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
		changeLogs,
		chatGroup
	},
	Mutation: {
		addNewChangeLog,
		signup,
		login,
		verifyEmail,
		createChatGroup,
		editChangeLog
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

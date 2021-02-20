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
import { createChat } from './createChat';
import { hasChat } from './chat';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		changeLogById,
		changeLogs,
		chatGroup,
		hasChat
	},
	Mutation: {
		addNewChangeLog,
		signup,
		login,
		verifyEmail,
		createChatGroup,
		editChangeLog,
		createChat
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

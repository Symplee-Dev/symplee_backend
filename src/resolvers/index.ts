import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user, updateUser } from './user';
import { verifyEmail } from './verifyEmail';
import { createChatGroup } from './createChatGroup';
import { chatGroup } from './chatGroup';
import {
	changeLogById,
	changeLogs,
	addNewChangeLog,
	editChangeLog
} from './changeLog';
import { serverStatus } from './serverStatus';
import { createChat } from './createChat';
import { hasChat } from './chat';
import { sendFeedback } from './feedback';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		changeLogById,
		changeLogs,
		serverStatus,
		chatGroup,
		hasChat
	},
	Mutation: {
		addNewChangeLog,
		signup,
		login,
		verifyEmail,
		editChangeLog,
		createChatGroup,
		createChat,
		sendFeedback,
		updateUser
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

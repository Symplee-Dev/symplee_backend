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
import { adminLogin, createAdmin } from './admin';
import {
	getFeedback,
	feedbackById,
	sendFeedback,
	toggleFeedbackResolved
} from './feedback';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		changeLogById,
		changeLogs,
		serverStatus,
		chatGroup,
		hasChat,
		getFeedback,
		feedbackById
	},
	Mutation: {
		adminLogin,
		createAdmin,
		addNewChangeLog,
		signup,
		login,
		verifyEmail,
		editChangeLog,
		createChatGroup,
		createChat,
		sendFeedback,
		toggleFeedbackResolved,
		updateUser
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user, updateUser } from './user';
import { verifyEmail } from './verifyEmail';
import { createChatGroup } from './createChatGroup';
import { chatGroup, updateChatGroup } from './chatGroup';
import {
	latestChangeLog,
	changeLogById,
	changeLogs,
	addNewChangeLog,
	editChangeLog
} from './changeLog';
import { serverStatus } from './serverStatus';
import { createChat } from './createChat';
import { hasChat } from './chat';
import { admin, adminLogin, createAdmin, sendAdminInvite } from './admin';
import {
	getFeedback,
	feedbackById,
	sendFeedback,
	toggleFeedbackResolved,
	deleteFeedback
} from './feedback';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		admin,
		changeLogById,
		changeLogs,
		latestChangeLog,
		serverStatus,
		chatGroup,
		hasChat,
		getFeedback,
		feedbackById
	},
	Mutation: {
		sendAdminInvite,
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
		deleteFeedback,
		updateUser,
		updateChatGroup
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	}
};

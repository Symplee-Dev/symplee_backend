import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import { userResolvers, user, updateUser, toggleUserOnline } from './user';
import { verifyEmail } from './verifyEmail';
import { createChatGroup } from './createChatGroup';
import { chatGroup, updateChatGroup, getMembers } from './chatGroup';
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
import { sendForgotPasswordEmail } from './sendForgotPasswordEmail';

import { sendMessage, messageSent, getMessages } from './messageChats';
import {
	acceptInvite,
	sendInvite,
	markNotificationAsRead,
	getNotifications
} from './invites';

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
		feedbackById,
		getMembers,
		getMessages,
		getNotifications
	},
	Mutation: {
		sendForgotPasswordEmail,
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
		updateChatGroup,
		sendMessage,
		toggleUserOnline,
		acceptInvite: acceptInvite as any,
		sendInvite: sendInvite as any,
		markNotificationAsRead: markNotificationAsRead as any
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	},
	Subscription: {
		messageSent
	}
};

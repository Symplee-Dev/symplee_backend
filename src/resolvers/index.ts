import { test } from './test';
import { signup } from './signup';
import { login } from './login';
import {
	userResolvers,
	user,
	updateUser,
	toggleUserOnline,
	blockUser,
	unblockUser,
	getDms
} from './user';
import { verifyEmail } from './verifyEmail';
import { createChatGroup, createDM } from './createChatGroup';
import {
	chatGroup,
	updateChatGroup,
	getMembers,
	searchGroups,
	deleteGroup
} from './chatGroup';
import {
	latestChangeLog,
	changeLogById,
	changeLogs,
	addNewChangeLog,
	editChangeLog
} from './changeLog';
import { serverStatus } from './serverStatus';
import { createChat } from './createChat';
import {
	hasChat,
	deleteChatChannel,
	userTypingSubscription,
	userTyping,
	getUsersChatsByGroupID
} from './chat';
import { admin, adminLogin, createAdmin, sendAdminInvite } from './admin';

import {
	getFeedback,
	feedbackById,
	sendFeedback,
	toggleFeedbackResolved,
	deleteFeedback
} from './feedback';
import { sendForgotPasswordEmail } from './sendForgotPasswordEmail';
import { mailboxUpdate } from './user';
import {
	sendMessage,
	messageSent,
	getMessages,
	editMessage,
	deleteMessage,
	messageEdited,
	messageDeleted
} from './messageChats';
import {
	getPendingFriends,
	getAcceptedFriends,
	getProfile,
	getBlockedFriends
} from './friends';
import {
	acceptInviteByLink,
	declineInvite,
	inviteByLink,
	joinGroup
} from './invites';

import {
	getFriends,
	addFriend,
	removeFriend,
	acceptFriend,
	declineFriend
} from './friends';
import {
	acceptInvite,
	sendInvite,
	markNotificationAsRead,
	getNotifications
} from './invites';
import { getCallMembers } from './call';
import {
	createUserRole,
	getUserRoles,
	deleteUserRole,
	editUserRole
} from './userRoles';

export const resolvers: Resolvers.Resolvers = {
	Query: {
		test,
		user,
		admin,
		getBlockedFriends,
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
		getNotifications,
		getFriends,
		searchGroups,
		getProfile,
		getPendingFriends,
		getAcceptedFriends,
		getDMS: getDms,
		getCallMembers,
		getUserRoles
	},
	Mutation: {
		editUserRole,
		deleteUserRole,
		createUserRole,
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
		acceptInvite,
		sendInvite,
		markNotificationAsRead,
		addFriend,
		removeFriend,
		acceptFriend,
		declineFriend,
		declineInvite,
		joinGroup,
		deleteGroup,
		editMessage,
		deleteMessage,
		deleteChatChannel,
		userTyping,
		inviteByLink,
		acceptInviteByLink,
		blockUser,
		unblockUser,
		createDM
	},
	User: {
		chatGroups: userResolvers.chatGroups as any
	},
	Subscription: {
		messageSent,
		messageDeleted,
		messageEdited,
		userTyping: userTypingSubscription,
		mailboxUpdate
	}
};

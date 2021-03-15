import UserFriends from '../models/UserFriends';
import Notifications from '../models/Notifications';
import User from '../models/User';
import ChatGroup from '../models/ChatGroup';
import UserGroups from '../models/UserGroups';
import { QueryBuilder } from 'objection';
import sendMailboxUpdate from '../utils/sendMailboxUpdate';
import { MAILBOX_PREFIX } from './messageChats';

export const addFriend = async (
	parent: any,
	args: Resolvers.MutationAddFriendArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('starting add friend');

	await UserFriends.query().insert({
		userId: args.friendRequest.userId,
		friendId: args.friendRequest.friendId,
		friendsSince: new Date().toString(),
		status: 'PENDING',
		sentBy: args.friendRequest.userId
	});

	await UserFriends.query().insert({
		userId: args.friendRequest.friendId,
		friendId: args.friendRequest.userId,
		friendsSince: new Date().toString(),
		status: 'PENDING',
		sentBy: args.friendRequest.userId
	});

	const { username } = await User.query()
		.where({ id: args.friendRequest.userId })
		.first();

	await Notifications.query().insert({
		userId: args.friendRequest.friendId,
		description: `${username} has sent you a friend request.`,
		type: 'FRIEND_REQUEST',
		fromId: args.friendRequest.userId,
		createdAt: new Date().toString()
	});

	sendMailboxUpdate({
		title: 'New friend request from ' + username,
		body: 'Visit your notifications to accept this friend request.',
		goTo: MAILBOX_PREFIX,
		userId: context.session?.userId ?? -1
	});

	return true;
};

export const removeFriend = async (
	parent: any,
	args: Resolvers.MutationRemoveFriendArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('Starting remove friend');

	await UserFriends.query()
		.delete()
		.where({ friendId: args.friendId, userId: args.userId });
	await UserFriends.query()
		.delete()
		.where({ friendId: args.userId, userId: args.friendId });

	return true;
};

export const getFriends = async (
	parent: any,
	args: Resolvers.QueryGetFriendsArgs,
	context: Services.ServerContext
): Promise<UserFriends[]> => {
	context.logger.info('Getting friends');

	const friends = await UserFriends.query()
		.where({ userId: args.userId })
		.withGraphFetched({ friend: true });

	return friends;
};

export const acceptFriend = async (
	parent: any,
	args: Resolvers.MutationAcceptFriendArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('Accepting friend request');
	context.logger.info(args);

	await Notifications.query()
		.where({
			id: args.notificationId
		})
		.first()
		.update({ read: true });

	await UserFriends.query()
		.where({ friendId: args.invite.userId, userId: args.invite.fromId })
		.first()
		.update({
			friendsSince: new Date().toString(),
			status: 'FRIENDS'
		});

	await UserFriends.query()
		.where({ userId: args.invite.userId, friendId: args.invite.fromId })
		.first()
		.update({
			friendsSince: new Date().toString(),
			status: 'FRIENDS'
		});

	const user = await User.query().findById(args.invite.userId);

	sendMailboxUpdate({
		title: 'Friend request accepted by ' + user.username + '#' + user.key,
		body: '',
		goTo: '',
		userId: args.invite.fromId
	});

	return true;
};

export const declineFriend = async (
	parent: any,
	args: Resolvers.MutationAcceptFriendArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('Declining friend request');

	await Notifications.query().delete().where({
		id: args.notificationId
	});

	await UserFriends.query()
		.where({ userId: args.invite.userId, fromId: args.invite.fromId })
		.delete();

	await UserFriends.query()
		.where({ fromId: args.invite.userId, userId: args.invite.fromId })
		.delete();

	const user = await User.query().findById(args.invite.userId);

	sendMailboxUpdate({
		title: 'Friend request rejected by ' + user.username + '#' + user.key,
		body: '',
		goTo: '',
		userId: args.invite.fromId
	});

	return true;
};

export const getAcceptedFriends = async (
	parent: any,
	args: Resolvers.QueryGetAcceptedFriendsArgs,
	context: Services.ServerContext
): Promise<UserFriends[]> => {
	context.logger.info('Getting accepted friends');

	const friends = await UserFriends.query()
		.where({
			userId: args.userId,
			status: 'FRIENDS'
		})
		.withGraphFetched({ friend: true });

	return friends;
};

export const getPendingFriends = async (
	parent: any,
	args: Resolvers.QueryGetAcceptedFriendsArgs,
	context: Services.ServerContext
): Promise<UserFriends[]> => {
	context.logger.info('Getting accepted friends');

	const friends = await UserFriends.query()
		.where({
			userId: args.userId,
			status: 'PENDING',
			sentBy: args.userId
		})
		.withGraphFetched({ friend: true });

	return friends;
};

export const getProfile = async (
	parent: any,
	args: Resolvers.QueryGetProfileArgs,
	context: Services.ServerContext
): Promise<Resolvers.GetProfileReturn> => {
	context.logger.info('Getting profile for user ' + args.userId);

	const profile = await User.query().where({ id: args.otherUserId }).first();
	const userGroups = await UserGroups.query().where({ userId: args.userId });
	const otherUserGroups = await UserGroups.query().where({
		userId: args.otherUserId
	});

	const relatedGroups = userGroups.filter(g => {
		const match = otherUserGroups.find(og => {
			context.logger.info(og.chatGroupId, g.chatGroupId);
			return og.chatGroupId === g.chatGroupId;
		});

		return match !== undefined;
	});

	const finalRelatedGroups: Promise<ChatGroup>[] = relatedGroups.map(
		async g => {
			const group = await ChatGroup.query()
				.where({ id: g.chatGroupId })
				.first();
			return group;
		}
	);

	await Promise.all(finalRelatedGroups);

	return {
		relatedGroups: (finalRelatedGroups as unknown) as ChatGroup[],
		user: profile
	};
};

export const getBlockedFriends = async (
	parent: any,
	args: Resolvers.QueryGetBlockedFriendsArgs,
	context: Services.ServerContext
): Promise<UserFriends[]> => {
	context.logger.info('Getting blocked friends');

	const friends = await UserFriends.query()
		.where({
			userId: args.userId,
			status: 'BLOCKED'
		})
		.withGraphFetched({ friend: true });

	return friends;
};

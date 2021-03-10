import UserFriends from '../models/UserFriends';
import Notifications from '../models/Notifications';
import User from '../models/User';

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
		status: 'PENDING'
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

	return true;
};

export const removeFriend = async (
	parent: any,
	args: Resolvers.MutationRemoveFriendArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('Starting remove friend');

	await UserFriends.query().delete().where({ friendId: args.friendId });

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

	const otherFriends = await UserFriends.query()
		.where({
			userId: args.friendId
		})
		.withGraphFetched({ friend: true });

	return [...friends, ...otherFriends];
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

	return true;
};

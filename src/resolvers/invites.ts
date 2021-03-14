import GroupInvites from '../models/GroupInvites';
import { v4 } from 'uuid';
import UserGroups from '../models/UserGroups';
import Notifications from '../models/Notifications';
import jwtDecode from 'jwt-decode';
import User from '../models/User';
import { EmailService } from '../Services/Email';
import jwt from 'jsonwebtoken';
import { Config } from '..';

export const sendInvite = async (
	parent: any,
	args: Resolvers.MutationSendInviteArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Starting to send an invite');

	const { fromId, groupId, uses, to } = args.invite;

	const newInvite = await GroupInvites.query()
		.insertAndFetch({
			fromId: fromId,
			groupId: groupId,
			uses: uses,
			used: 0,
			code: v4()
		})
		.withGraphFetched({ fromAuthor: true, group: true });

	for (let i = 0; i < to.length; i++) {
		await Notifications.query().insert({
			userId: to[i],
			description: `${newInvite.fromAuthor.username} has invited you to join ${newInvite.group.name}`,
			type: 'INVITE',
			fromId,
			code: newInvite.code,
			createdAt: new Date().toString()
		});
	}

	return newInvite.code;
};

export const acceptInvite = async (
	parent: any,
	args: Resolvers.MutationAcceptInviteArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Starting to accept invite');

	const { code, userId, notificationId } = args.acceptArgs;

	const invite = await GroupInvites.query().where({ code }).first();

	if (invite) {
		if (invite.uses !== -1 && invite.uses < invite.used) {
			if (invite.uses === invite.used - 1) {
				await GroupInvites.query().deleteById(invite.id);
			} else {
				await GroupInvites.query().patchAndFetchById(invite.id, {
					used: invite.used + 1
				});
			}
		}

		const existingRelation = await UserGroups.query()
			.where({
				userId,
				chatGroupId: invite.groupId
			})
			.first();

		if (existingRelation) throw new Error('Already In This group!');

		const createdRelation = await UserGroups.query().insertAndFetch({
			userId: userId,
			chatGroupId: invite.groupId
		});

		if (!createdRelation) {
			context.logger.err('Failed to accept invite ' + code);
			throw new Error('Could not accept invite. Try again later.');
		}

		// Entered manually
		if (notificationId !== -1) {
			await Notifications.query().patchAndFetchById(notificationId, {
				read: true
			});
		}

		return true;
	}

	return false;
};

export const declineInvite = async (
	parent: any,
	args: Resolvers.MutationDeclineInviteArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Declining invite');

	const { code, userId, notificationId } = args.declineArgs;

	await Notifications.query().patchAndFetchById(notificationId, {
		read: true
	});

	return true;
};

export const markNotificationAsRead = async (
	parent: any,
	args: Resolvers.MutationMarkNotificationAsReadArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Starting to mark notification as read');

	const { notificationId } = args;

	const res = await Notifications.query().patchAndFetchById(notificationId, {
		read: true
	});

	if (!res) {
		throw new Error('Unable to mark as read. Try again later.');
	}

	return true;
};

export const getNotifications = async (
	parent: any,
	args: Resolvers.QueryGetNotificationsArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Starting to get notifications');

	const { userId, type } = args;

	let notifications: Notifications[] = [];

	if (type === 'ALL') {
		notifications = await Notifications.query()
			.where({ userId })
			.withGraphFetched({ from: true });
	}

	if (type === 'READ') {
		notifications = await Notifications.query()
			.where({ userId, read: true })
			.limit(50)
			.withGraphFetched({ from: true });
	}

	if (type === 'UNREAD') {
		notifications = await Notifications.query()
			.where({ userId, read: false })
			.withGraphFetched({ from: true });
	}

	return notifications;
};

export const joinGroup = async (
	parent: any,
	args: Resolvers.MutationJoinGroupArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Starting join group');

	const { userId, groupId } = args;

	const createdRelation = await UserGroups.query().insertAndFetch({
		userId: userId,
		chatGroupId: groupId
	});

	if (!createdRelation) {
		context.logger.err('Failed to accept join group');
		throw new Error('Could not accept invite. Try again later.');
	}

	return true;
};

export const acceptInviteByLink = async (
	parent: any,
	args: Resolvers.MutationAcceptInviteByLinkArgs,
	context: Services.ServerContext
): Promise<Schema.ErrorCode> => {
	context.logger.info('Starting acceptInvite By Link');

	const { token } = args;

	const decoded: {
		userId: number;
		code: string;
		groupId: number;
	} = jwtDecode(token);

	const invite = await GroupInvites.query()
		.where({ code: decoded.code })
		.first();

	if (invite) {
		if (invite.uses !== -1 && invite.uses < invite.used) {
			if (invite.uses === invite.used - 1) {
				await GroupInvites.query().deleteById(invite.id);
			} else {
				await GroupInvites.query().patchAndFetchById(invite.id, {
					used: invite.used + 1
				});
			}
		}

		const existingRelation = await UserGroups.query()
			.where({
				userId: decoded.userId,
				chatGroupId: invite.groupId
			})
			.first();

		if (existingRelation) throw new Error('Already In This group!');

		const createdRelation = await UserGroups.query().insertAndFetch({
			userId: decoded.userId,
			chatGroupId: invite.groupId
		});

		if (!createdRelation) {
			context.logger.err('Failed to accept invite ' + decoded.code);
			return 'ALREADY_FAILURE';
		}
	}

	return 'SUCCESS';
};

export const inviteByLink = async (
	parent: any,
	args: Resolvers.MutationInviteByLinkArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const { groupId, userId, otherUserId, uses } = args;

	const user = await User.query().findById(otherUserId);

	if (!user) throw new Error('User does not exist!');

	const newInvite = await GroupInvites.query()
		.insertAndFetch({
			fromId: userId,
			groupId: groupId,
			uses: uses,
			used: 0,
			code: v4()
		})
		.withGraphFetched({ fromAuthor: true, group: true });

	const LINK_TO =
		process.env.NODE_ENV === 'production'
			? 'https://symplee.app/verify/group'
			: 'http://localhost:3000/verify/group';

	const JWTOptions: jwt.SignOptions = {
		expiresIn: '30d'
	};

	const token = await jwt.sign(
		{
			userId: otherUserId,
			code: newInvite.code,
			groupId: newInvite.groupId
		},
		Config.SESSION_SECRET,
		JWTOptions
	);

	await new EmailService(context, '').sendPlainEmail(
		user.email,
		'You have been invited to a group!',
		'You have been invited to a group!',
		'<h3>Click the link to join</h3> <br> <a href="' +
			LINK_TO +
			'/' +
			token +
			'">Join Group</a>'
	);

	return true;
};

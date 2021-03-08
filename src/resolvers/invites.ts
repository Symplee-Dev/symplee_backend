import GroupInvites from '../models/GroupInvites';
import { v4 } from 'uuid';
import UserGroups from '../models/UserGroups';
import Notifications from '../models/Notifications';

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

		const existingRelation = await UserGroups.query().where({
			userId,
			chatGroupId: invite.groupId
		});

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

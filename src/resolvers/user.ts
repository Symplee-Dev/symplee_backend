import User from '../models/User';
import UserGroups from '../models/UserGroups';
import ChatGroup from '../models/ChatGroup';
import { pubsub } from '..';

export const userResolvers = {
	chatGroups: async (
		parent: any,
		args: any,
		context: Services.ServerContext
	) => {
		context.logger.info('Query user args');

		// const { chatGroups } = await User.query()
		// 	.where({
		// 		id: parent.id
		// 	})
		// 	.withGraphFetched({ chatGroups: true })
		// 	.first();

		const groupsIds = await UserGroups.query().where({ userId: parent.id });

		console.log(groupsIds);

		let groups: ChatGroup[] = [];

		for (let i = 0; i < groupsIds.length; i++) {
			const group = await ChatGroup.query().findById(
				groupsIds[i].chatGroupId
			);

			groups.push(group);
		}

		return groups;
	}
};

export const user = async (
	parent: any,
	args: Resolvers.QueryUserArgs,
	context: Services.ServerContext
): Promise<Resolvers.User> => {
	const { id } = args;

	const user = await User.query().where({ id }).first();

	return user;
};

export const updateUser = async (
	parent: any,
	args: Resolvers.MutationUpdateUserArgs,
	context: Services.ServerContext
): Promise<Resolvers.User> => {
	context.logger.info('Updating user');

	const edited = await User.query().patchAndFetchById(args.userId, args.user);

	if (!edited) {
		context.logger.err('Error updating user with id of ' + args.userId);
		throw new Error('Unable to update user. Try again later.');
	}

	return edited;
};

export const sendMessage = async (
	parent: any,
	args: Resolvers.MutationSendMessageArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	context.logger.info('Sending message');

	pubsub.publish('MESSAGE_SENT', { chatGroupId: 1, message: args.message });

	return true;
};

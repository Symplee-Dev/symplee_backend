import { ApolloError } from 'apollo-server-errors';
import jwtDecode from 'jwt-decode';
import User from '../models/User';
import { Authentication } from '../Services/Authentication';
import UserGroups from '../models/UserGroups';
import ChatGroup from '../models/ChatGroup';

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

	const tokenID: { userId: number; exp: number } | false =
		!!context.token && jwtDecode(context.token);

	context.logger.info('tokenID: ', tokenID);

	if (!tokenID || tokenID.exp > Date.now()) {
		throw new ApolloError('User Not Authenticated', '401');
	}

	let userUpdate = args.user.password
		? {
				...args.user,
				password: await new Authentication(
					args.user.password
				).hashPassword()
		  }
		: { ...args.user };

	const edited = await User.query().patchAndFetchById(
		tokenID.userId,
		userUpdate
	);

	context.logger.info('Edited: ', edited);

	if (!edited) {
		if (args.userId) {
			context.logger.err('Error updating user with id of ' + args.userId);
		}
		throw new Error('Unable to update user. Try again later.');
	}

	return edited;
};

export const toggleUserOnline = async (parent: any, args: Resolvers.MutationToggleUserOnlineArgs, context: Services.ServerContext): Promise<boolean> => {
	const tokenId: { userId: number, exp: number} | false = !!context.token && jwtDecode(context.token);

	context.logger.info('toggleUserOnline')

	if(!tokenId) {
		throw new ApolloError('No user to toggle', '400')
	}
	
	const findUser = await User.query().findById(tokenId.userId);
	
	context.logger.info("User > ", findUser)
	
	if(!findUser) {
		throw new ApolloError('No user to toggle', '400')		
	}

	if(tokenId.exp > Date.now()) {
		await User.query().patchAndFetchById(tokenId.userId, {is_online: false})
		return false; 
	}

	const isOnline = (await User.query().patchAndFetchById(tokenId.userId, { is_online: args.status ? args.status : false })).is_online
	return isOnline;
}

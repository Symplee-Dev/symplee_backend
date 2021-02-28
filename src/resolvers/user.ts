import { ApolloError } from 'apollo-server-errors';
import jwtDecode from 'jwt-decode';
import { FlowArrayMutation } from 'typescript';
import User from '../models/User';
import { Authentication } from '../Services/Authentication';

export const userResolvers = {
	chatGroups: async (
		parent: any,
		args: any,
		context: Services.ServerContext
	) => {
		context.logger.info('Query user args');

		const { chatGroups } = await User.query()
			.where({
				id: parent.id
			})
			.withGraphFetched({ chatGroups: true })
			.first();

		return chatGroups;
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

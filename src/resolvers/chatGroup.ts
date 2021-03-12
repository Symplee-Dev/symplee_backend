import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import jwtDecode from 'jwt-decode';
import ChatGroup from '../models/ChatGroup';
import UserGroups from '../models/UserGroups';

export const chatGroup = async (
	parent: any,
	args: Resolvers.QueryChatGroupArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChatGroup> => {
	const { id } = args;

	context.logger.info('Query: ChatGroup resolver');

	const chatGroup = ChatGroup.query()
		.findById(id)
		.withGraphFetched({ chats: true });

	return chatGroup;
};

export const updateChatGroup = async (
	parent: any,
	args: Resolvers.MutationUpdateChatGroupArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Updating chat group');

	const edited = await ChatGroup.query().patchAndFetchById(args.chatGroupId, {
		...args.group
	});

	if (!edited) {
		context.logger.err(
			'Error updating chat group with id of ' + args.chatGroupId
		);
		throw new Error('Unable to update chat group. Try again later.');
	}

	return edited;
};

export const getMembers = async (
	parent: any,
	args: Resolvers.QueryGetMembersArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Getting members for chat group' + args.chatId);

	const members = await ChatGroup.query()
		.findById(args.chatId)
		.withGraphFetched({ members: true });

	console.log(members);

	return members.members;
};

export const searchGroups = async (
	parent: any,
	args: Resolvers.QuerySearchGroupsArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Searching groups');

	const groups = await ChatGroup.query().where({ isPublic: true }).limit(100);

	const groupsFiltered = groups.filter(
		g => g.name.search(args.queryString) !== -1
	);

	return groupsFiltered;
};

export const deleteGroup = async (
	parent: any,
	args: Resolvers.MutationDeleteGroupArgs,
	context: Services.ServerContext
) => {
	const id = args.chatGroupId;
	context.logger.info('Deleting Group ID ' + id);

	const token = context.token;

	if (!id) {
		throw new ApolloError('No group to delete', '404');
	}

	if (!token || !context.authenticated) {
		throw new AuthenticationError('User not authenticated');
	}

	const decode: any = jwtDecode(token);

	const group = await ChatGroup.query().findById(id);

	if (!group) {
		throw new ApolloError('No Group found', '500');
	}

	console.log(decode);

	if (group.createdBy !== decode.userId) {
		throw new AuthenticationError('User not authenticated');
	}

	try {
		await UserGroups.query().delete().where('chatGroupId', id);
		await ChatGroup.query().deleteById(id);
		return true;
	} catch (error) {
		throw new ApolloError(error, '500');
	}
};

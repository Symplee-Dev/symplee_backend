import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '..';
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

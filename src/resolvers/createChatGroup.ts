import ChatGroup from '../models/ChatGroup';
import UserGroups from '../models/UserGroups';

export const createChatGroup = async (
	parent: any,
	args: Resolvers.MutationCreateChatGroupArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChatGroup> => {
	const { name, isPublic, userId } = args.chatGroup;

	context.logger.info('Trying to create chat group with name: ' + name);

	const created = await ChatGroup.query().insertAndFetch({
		name,
		isPublic,
		createdBy: userId,
		createdAt: new Date().toString()
	});

	const createdRelation = await UserGroups.query().insertAndFetch({
		userId: userId,
		chatGroupId: created.id
	});

	if (!created || !createdRelation) {
		context.logger.err('Error created chatGroup');
		throw new Error('Could not create group. Try again later.');
	}

	return created;
};
import ChatGroup from '../models/ChatGroup';
import UserGroups from '../models/UserGroups';
import Chat from '../models/Chat';
import ChatUsers from '../models/ChatUsers';

export const createChatGroup = async (
	parent: any,
	args: Resolvers.MutationCreateChatGroupArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChatGroup> => {
	const { name, isPublic, userId, avatar, type } = args.chatGroup;

	context.logger.info('Trying to create chat group with name: ' + name);

	const created = await ChatGroup.query().insertAndFetch({
		name,
		isPublic,
		createdBy: userId,
		createdAt: new Date().toString(),
		avatar,
		type: type ? type : 'CHAT_GROUP'
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

export const createDM = async (
	parent: any,
	args: Resolvers.MutationCreateDmArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChatGroup> => {
	const { name, isPublic, userId, avatar, type, includes } = args.dm;

	context.logger.info('Trying to create chat group with name: ' + name);

	const created = await ChatGroup.query().insertAndFetch({
		name,
		isPublic,
		createdBy: userId,
		createdAt: new Date().toString(),
		avatar,
		type: type ? type : 'CHAT_GROUP'
	});

	const createdRelation = await UserGroups.query().insertAndFetch({
		userId: userId,
		chatGroupId: created.id
	});

	if (!created || !createdRelation) {
		context.logger.err('Error created chatGroup');
		throw new Error('Could not create group. Try again later.');
	}

	const createdChat = await Chat.query().insertAndFetch({
		name: '',
		isPublic: false,
		createdById: userId,
		icon: '',
		chatGroupId: created.id,
		mode: 'chat'
	});

	await ChatUsers.query().insertAndFetch({
		userId,
		chatId: createdChat.id
	});

	for (let i = 0; i < includes.length; i++) {
		const createdRelation = await UserGroups.query().insertAndFetch({
			userId: includes[i],
			chatGroupId: created.id
		});

		if (!created || !createdRelation) {
			context.logger.err('Error created chatGroup');
			throw new Error('Could not create group. Try again later.');
		}

		await ChatUsers.query().insertAndFetch({
			userId: includes[i],
			chatId: createdChat.id
		});
	}

	const final = await ChatGroup.query()
		.findById(created.id)
		.withGraphFetched({ chats: true });

	return { ...final, chats: [final.chats[0]] };
};

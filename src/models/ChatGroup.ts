import BaseModel from './BaseModel';
import Chat from './Chat';

class ChatGroup extends BaseModel {
	id!: number;
	name!: string;
	isPublic!: boolean;
	createdAt!: string;
	chats!: Chat[];

	static get tableName() {
		return 'chat_groups';
	}

	static relationMappings = {
		messages: {
			relation: BaseModel.HasManyRelation,
			modelClass: Chat,
			join: {
				from: 'chat_groups.id',
				to: 'chats.chatGroupId'
			}
		}
	};
}

export default ChatGroup;

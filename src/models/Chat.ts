import BaseModel from './BaseModel';
import MessagesChats from './MessagesChats';

class Chat extends BaseModel {
	id!: number;
	name!: string;
	isPublic!: boolean;
	createdById!: number;
	messages!: MessagesChats[];
	icon!: string;
	chatGroupId!: number;

	static get tableName() {
		return 'chats';
	}

	static relationMappings = {
		messages: {
			relation: BaseModel.HasManyRelation,
			modelClass: MessagesChats,
			join: {
				from: 'chats.id',
				to: 'messages_chats.chatId'
			}
		}
	};
}

export default Chat;

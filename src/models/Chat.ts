import BaseModel from './BaseModel';
import Message from './Message';

class Chat extends BaseModel {
	id!: number;
	name!: string;
	isPublic!: boolean;
	createdById!: number;
	messages!: Message[];
	icon!: string;
	chatGroupId!: number;

	static get tableName() {
		return 'chats';
	}

	static relationMappings = {
		messages: {
			relation: BaseModel.HasManyRelation,
			modelClass: Message,
			join: {
				from: 'chats.id',
				to: 'messages.chatGroupId'
			}
		}
	};
}

export default Chat;

import BaseModel from './BaseModel';
import User from './User';

class MessagesChats extends BaseModel {
	id!: number;
	body!: string;
	authorUsername!: string;
	authorId!: number;
	createdAt!: string;
	chatId!: number;
	author!: User;

	static get tableName() {
		return 'messages_chats';
	}

	static relationMappings = {
		author: {
			relation: BaseModel.HasOneRelation,
			modelClass: User,
			join: {
				from: 'messages_chats.authorId',
				to: 'users.id'
			}
		}
	};
}

export default MessagesChats;

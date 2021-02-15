import BaseModel from './BaseModel';
import Message from './Message';

class Chat extends BaseModel {
	id!: number;
	name!: string;
	is_public!: boolean;
	messages!: number[];

	static get tableName() {
		return 'chats';
	}

	static relationMappings = {
		messages: {
			relation: BaseModel.ManyToManyRelation,
			modelClass: Message,
			join: {
				from: 'chats.id',
				through: {
					from: 'messages.chatid',
					to: 'messages.id'
				},
				to: 'messages.id'
			}
		}
	};
}

export default Chat;

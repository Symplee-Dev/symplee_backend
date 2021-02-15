import BaseModel from './BaseModel';
import Chat from './Chat';
import User from './User';

class Message extends BaseModel {
	id!: number;
	body!: string;
	authorid!: number;
	chatid!: number;

	static get tableName() {
		return 'messages';
	}

	static relationMappings = {
		author: {
			relation: BaseModel.HasManyRelation,
			modelClass: User,
			join: {
				from: 'messages.authorid',
				to: 'users.id'
			}
		},
		chatGroup: {
			relation: BaseModel.HasManyRelation,
			modelClass: Chat,
			join: {
				from: 'messages.chatid',
				to: 'chats.id'
			}
		}
	};
}

export default Message;

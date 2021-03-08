import BaseModel from './BaseModel';
import Chat from './Chat';

class ChatUsers extends BaseModel {
	id!: number;
	userId!: number;
	chatId!: number;

	static get tableName() {
		return 'chat_users';
	}
}

export default ChatUsers;

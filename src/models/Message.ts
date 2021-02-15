import BaseModel from './BaseModel';

class Message extends BaseModel {
	id!: number;
	body!: string;
	authorId!: number;
	chatId!: number;
	createdAt!: string;

	static get tableName() {
		return 'messages';
	}
}

export default Message;

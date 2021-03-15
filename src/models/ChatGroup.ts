import BaseModel from './BaseModel';
import Chat from './Chat';
import User from './User';

class ChatGroup extends BaseModel {
	id!: number;
	name!: string;
	isPublic!: boolean;
	createdAt!: string;
	chats!: Chat[];
	createdBy!: number;
	avatar?: string;
	members!: User[];
	type?: string = 'CHAT_GROUP';

	static get tableName() {
		return 'chat_groups';
	}

	static relationMappings = {
		chats: {
			relation: BaseModel.HasManyRelation,
			modelClass: Chat,
			join: {
				from: 'chat_groups.id',
				to: 'chats.chatGroupId'
			}
		},
		members: {
			relation: BaseModel.ManyToManyRelation,
			modelClass: User,
			join: {
				from: 'chat_groups.id',
				through: {
					from: 'user_groups.chatGroupId',
					to: 'user_groups.userId'
				},
				to: 'users.id'
			}
		}
	};
}

export default ChatGroup;

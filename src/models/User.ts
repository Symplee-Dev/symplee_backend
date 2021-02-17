import BaseModel from './BaseModel';
import Message from './Message';
import ChatGroup from './ChatGroup';

class User extends BaseModel {
	id!: number;
	email!: string;
	name!: string;
	password!: string;
	username!: string;
	key!: string;
	chatGroups!: ChatGroup[];

	static get tableName() {
		return 'users';
	}

	static relationMappings = {
		messages: {
			relation: BaseModel.HasManyRelation,
			modelClass: Message,
			join: {
				from: 'users.id',
				to: 'messages.authorid'
			}
		},
		chatGroups: {
			relation: BaseModel.ManyToManyRelation,
			modelClass: ChatGroup,
			join: {
				from: 'users.id',
				through: {
					from: 'user_groups.userId',
					to: 'user_groups.chatGroupId'
				},
				to: 'chat_groups.id'
			}
		}
	};
}

export default User;

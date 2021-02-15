import BaseModel from './BaseModel';
import Chat from './Chat';
import Message from './Message';

class User extends BaseModel {
	id!: number;
	email!: string;
	name!: string;
	password!: string;
	username!: string;
	key!: string;

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
		}
	};
}

export default User;

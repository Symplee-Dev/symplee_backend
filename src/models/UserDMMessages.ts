import BaseModel from './BaseModel';
import User from './User';

class UserDMMessages extends BaseModel {
	id!: number;
	body!: string;
	authorUsername!: string;
	authorId!: number;
	author!: User;
	createdAt!: string;
	dmId!: number;

	static get tableName() {
		return 'user_dm_messages';
	}

	static relationMappings = {
		author: {
			relation: BaseModel.HasOneRelation,
			modelClass: User,
			join: {
				from: 'user_dm_messages.authorId',
				to: 'users.id'
			}
		}
	};
}

export default UserDMMessages;

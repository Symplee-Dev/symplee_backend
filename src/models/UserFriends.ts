import BaseModel from './BaseModel';
import User from './User';

class UserFriends extends BaseModel {
	id!: number;
	userId!: number;
	friendId!: number;
	friendsSince!: string;
	status!: string;
	sentBy!: number;

	static get tableName() {
		return 'user_friends';
	}

	static relationMappings = {
		friend: {
			relation: BaseModel.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: 'user_friends.friendId',
				to: 'users.id'
			}
		}
	};
}

export default UserFriends;

import BaseModel from './BaseModel';
import UserDMMessages from './UserDMMessages';

class UserDM extends BaseModel {
	id!: number;
	userId!: number;
	users!: number[];
	messages!: UserDMMessages[];

	static get tableName() {
		return 'user_dm';
	}

	static relationMappings = {
		messages: {
			relation: BaseModel.HasManyRelation,
			modelClass: UserDMMessages,
			join: {
				from: 'user_dm.id',
				to: 'user_dm_messages.dmId'
			}
		}
	};
}

export default UserDM;

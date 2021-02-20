import BaseModel from './BaseModel';

class UserGroups extends BaseModel {
	id!: number;
	userId!: number;
	chatGroupId!: number;

	static get tableName() {
		return 'user_groups';
	}
}

export default UserGroups;

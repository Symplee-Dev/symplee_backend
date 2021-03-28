import { snakeCaseMappers } from 'objection';
import BaseModel from './BaseModel';
import ChatGroup from './ChatGroup';
import User from './User';

class UserRoles extends BaseModel {
	id!: number;
	userId!: number;
	groupId!: number;
	role!: string;
	roleIndex!: number;
	user!: User;
	chatGroup!: ChatGroup;

	static columnNameMappers = snakeCaseMappers();

	static get tableName() {
		return 'user_roles';
	}

	static relationMappings = {
		user: {
			relation: BaseModel.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: 'user_roles.user_id',
				to: 'users.id'
			}
		},
		chatGroup: {
			relation: BaseModel.HasOneRelation,
			modelClass: ChatGroup,
			join: {
				from: 'user_roles.group_id',
				to: 'chat_groups.id'
			}
		}
	};
}

export default UserRoles;

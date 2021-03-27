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

	static columnNameMappers = snakeCaseMappers();

	static get tableName() {
		return 'user_roles';
	}

	static relationshipMappings = {
		user: {
			relation: BaseModel.BelongsToOneRelation,
			model: User,
			join: {
				from: 'user_roles.user_id',
				to: 'users.id'
			}
		},
		chatGroup: {
			relation: BaseModel.BelongsToOneRelation,
			model: ChatGroup,
			join: {
				from: 'user_roles.group_id',
				to: 'chat_groups.id'
			}
		}
	};
}

export default UserRoles;

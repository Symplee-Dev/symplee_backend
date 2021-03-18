import BaseModel from './BaseModel';
import ChatGroup from './ChatGroup';

class User extends BaseModel {
	id!: number;
	email!: string;
	name!: string;
	password!: string;
	username!: string;
	key!: string;
	chatGroups!: ChatGroup[];
	createdAt!: string;
	verified!: boolean;
	avatar?: string;
	is_online!: boolean;

	static get tableName() {
		return 'users';
	}

	static relationMappings = {
		// chatGroups: {
		// 	relation: BaseModel.ManyToManyRelation,
		// 	modelClass: ChatGroup,
		// 	join: {
		// 		from: 'users.id',
		// 		through: {
		// 			from: 'user_groups.userId',
		// 			to: 'user_groups.chatGroupId'
		// 		},
		// 		to: 'chat_groups.id'
		// 	}
		// }
	};
}

export default User;

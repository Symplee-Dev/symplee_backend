import BaseModel from './BaseModel';
import User from './User';
import ChatGroup from './ChatGroup';

class GroupInvites extends BaseModel {
	id!: number;
	fromId!: number;
	fromAuthor!: User;
	code!: string;
	uses!: number;
	used!: number;
	groupId!: number;
	group!: ChatGroup;

	static get tableName() {
		return 'group_invites';
	}

	static relationMappings = {
		fromAuthor: {
			relation: BaseModel.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: 'group_invites.fromId',
				to: 'users.id'
			}
		},
		group: {
			relation: BaseModel.BelongsToOneRelation,
			modelClass: ChatGroup,
			join: {
				from: 'group_invites.groupId',
				to: 'chat_groups.id'
			}
		}
	};
}

export default GroupInvites;

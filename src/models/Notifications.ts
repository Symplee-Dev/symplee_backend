import BaseModel from './BaseModel';
import User from './User';

export type NotificationType = 'INVITE' | 'FRIEND_REQUEST';

class Notifications extends BaseModel {
	id!: number;
	userId!: number;
	description!: string;
	type!: NotificationType;
	fromId?: number;
	from?: User;
	createdAt!: string;
	read!: boolean;
	code?: string;

	static get tableName() {
		return 'notifications';
	}

	static relationMappings = {
		from: {
			relation: BaseModel.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: 'notifications.fromId',
				to: 'users.id'
			}
		}
	};
}

export default Notifications;

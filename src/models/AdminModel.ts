import BaseModel from './BaseModel';

class AdminModel extends BaseModel {
	id!: number;
	username!: string;
	email!: string;
	name!: string;
	password!: string;
	pin!: string;
	created_at!: string;
	verified!: boolean;

	static get tableName() {
		return 'admin_users';
	}
}

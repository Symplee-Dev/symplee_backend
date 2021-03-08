import BaseModel from './BaseModel';

class AdminModel extends BaseModel {
	id!: number;
	username!: string;
	email!: string;
	name!: string;
	password!: string;
	pin!: number;
	created_at!: string;
	verified!: boolean;
	key!: string;

	static get tableName() {
		return 'admin_users';
	}
}

export default AdminModel;

import BaseModel from './BaseModel';

class User extends BaseModel {
	id!: number;
	email!: string;
	name!: string;
	password!: string;
	username!: string;
	key!: string;

	static get tableName() {
		return 'users';
	}
}

export default User;

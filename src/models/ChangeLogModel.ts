import BaseModel from './BaseModel';

class ChangeLog extends BaseModel {
	id!: number;
	version!: string;
	changes!: string[];
	created_at!: string;
	updated_at!: string;
	body!: string;

	static get tableName() {
		return 'change_log';
	}
}

export default ChangeLog;

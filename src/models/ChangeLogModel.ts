import BaseModel from './BaseModel';

class ChangeLog extends BaseModel {
	id!: number;
	version!: string;
	changes!: string[];
	createdAt!: string;
	body!: string;

	static get tableName() {
		return 'change_log';
	}
}

export default ChangeLog;

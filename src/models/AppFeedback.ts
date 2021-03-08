import BaseModel from './BaseModel';

class AppFeedback extends BaseModel {
	id!: number;
	createdAt!: string;
	userName?: string;
	userEmail!: string;
	resolved!: boolean;
	body!: string;
	error?: string;
	sentryErrorUrl?: string;
	logRocketErrorUrl?: string;

	static get tableName() {
		return 'app_feedback';
	}
}

export default AppFeedback;

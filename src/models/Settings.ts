import BaseModel from './BaseModel';
import { DefaultSettings } from '../Services/SettingsStore';

class Settings extends BaseModel {
	id!: number;
	settingType!: keyof DefaultSettings;
	value!: string;
	userId!: number;

	static get tableName() {
		return 'settings';
	}
}

export default Settings;

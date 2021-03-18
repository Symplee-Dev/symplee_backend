import Objection from 'objection';
import Settings from '../models/Settings';
import { SettingsStore, DefaultSettings } from '../Services/SettingsStore';

export const getSettings = async (
	parent: any,
	args: Resolvers.QueryGetSettingsArgs,
	context: Services.ServerContext
) => {
	const userSettings = await Settings.query().where({ userId: args.userId });

	let toStore: any = {};

	for (let i = 0; i < userSettings.length; i++) {
		if (toStore[userSettings[i].settingType]) {
			toStore[userSettings[i].settingType] = userSettings[i].value;
		}
	}

	const store = new SettingsStore(toStore);
	await store.initialize();

	return store.serialize();
};

export const editOrAddSettings = async (
	parent: any,
	args: Resolvers.MutationEditOrAddSettingsArgs,
	context: Services.ServerContext
) => {
	const edits: Promise<any>[] = [];

	for (let i = 0; i < args.setting.length; i++) {
		const existing = await Settings.query()
			.where({
				settingType: args.setting[i].type,
				userId: args.userId
			})
			.first();

		if (!existing) {
			edits.push(
				Settings.query().insert({
					value: args.setting[i].value,
					userId: args.userId,
					settingType: args.setting[i].type as keyof DefaultSettings
				})
			);
		} else {
			edits.push(
				Settings.query()
					.where({
						userId: args.userId,
						settingType: args.setting[i].type
					})
					.first()
					.patch({ value: args.setting[i].value })
			);
		}
	}

	try {
		await Promise.all(edits);
	} catch (e) {
		throw new Error('Could not make changes.');
	}

	return true;
};

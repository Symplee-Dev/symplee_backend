type DefaultBoolean = 'true' | 'false';

export type DefaultSettings = {
	PREFERRED_THEME: 'Light' | 'Dark';
	FONT_SIZE: 'Small' | 'Medium' | 'Large';
	LANGUAGE: 'English';
	DYSLEXIC_FONT: DefaultBoolean;
	SEARCHABLE: DefaultBoolean;
	RECEIVE_NON_FRIEND_MESSAGES: DefaultBoolean;
	HIDE_PROFILE_NON_FRIENDS: DefaultBoolean;
	MUTE_ALL: DefaultBoolean;
	ONLY_MENTIONS: DefaultBoolean;
	MESSAGE_NOTIFICATIONS: DefaultBoolean;
	FOCUS_ON_CALL: DefaultBoolean;
};

const entries = Object.entries as <T>(
	o: T
) => [Extract<keyof T, string>, T[keyof T]][];

export class SettingsStore {
	userSettings!: Partial<DefaultSettings>;
	locked: boolean = false;
	PREFERRED_THEME?: DefaultSettings['PREFERRED_THEME'] = 'Light';
	FONT_SIZE?: DefaultSettings['FONT_SIZE'] = 'Medium';
	LANGUAGE?: DefaultSettings['LANGUAGE'] = 'English';
	DYSLEXIC_FONT?: DefaultSettings['DYSLEXIC_FONT'] = 'false';
	SEARCHABLE?: DefaultSettings['SEARCHABLE'] = 'true';
	RECEIVE_NON_FRIEND_MESSAGES?: DefaultBoolean = 'true';
	HIDE_PROFILE_NON_FRIENDS?: DefaultBoolean = 'false';
	MUTE_ALL?: DefaultBoolean = 'false';
	ONLY_MENTIONS?: DefaultBoolean = 'false';
	MESSAGE_NOTIFICATIONS?: DefaultBoolean = 'true';
	FOCUS_ON_CALL?: DefaultBoolean = 'true';

	constructor(settings: Partial<DefaultSettings>) {
		this.userSettings = settings;
	}

	async initialize() {
		this.locked = true;

		for (const [key, val] of entries(this.userSettings)) {
			if (val) {
				this[key] = val as any;
			}
		}

		this.locked = false;
	}

	serialize(): DefaultSettings {
		if (this.locked) {
			throw new Error('Cannot serialize a locked initializer.');
		}

		const settings = {
			...(this as DefaultSettings & {
				userSettings?: Partial<DefaultSettings>;
			})
		};

		delete settings.userSettings;

		return settings;
	}
}

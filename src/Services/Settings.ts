export enum DefaultSettingsTypeEnum {
	PREFERRED_THEME = 'PREFERRED_THEME'
}

export type DefaultSettings = {
	PREFERRED_THEME: 'Light' | 'Dark';
	FONT_SIZE: 'Small' | 'Medium' | 'Large';
	LANGUAGE: 'English';
	DYSLEXIC_FONT: 'true' | 'false';
	SEARCHABLE: 'true' | 'false';
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

async function test() {
	const a = new SettingsStore({ PREFERRED_THEME: 'Dark' });

	await a.initialize();

	console.log(a.serialize());
}

test();

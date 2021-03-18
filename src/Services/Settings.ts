export enum DefaultSettingsTypeEnum {
	PREFERRED_THEME = 'PREFERRED_THEME'
}

export type Default_Settings = {
	PREFERRED_THEME: 'Light' | 'Dark';
	FONT_SIZE: 'Small' | 'Medium' | 'Large';
	LANGUAGE: 'English';
	DYSLEXIC_FONT: 'true' | 'false';
	SEARCHABLE: 'true' | 'false';
};

export class DefaultSettings {
	userSettings!: Default_Settings;
	preferred_theme: Default_Settings['PREFERRED_THEME'] = 'Light';

	constructor(settings: Default_Settings) {}

	async initialize() {}
}

// const a = new DefaultSettings({ PREFERRED_THEME: 'Light' });

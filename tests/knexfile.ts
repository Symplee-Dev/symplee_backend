// Update with your config settings.

import { resolve } from 'path';
import { Config } from 'knex';

const development: Config = {
	client: 'sqlite3',
	connection: ':memory:',
	useNullAsDefault: true,
	debug: false,
	migrations: {
		directory: resolve(__dirname, 'migrations')
	},
	seeds: {
		directory: resolve(__dirname, 'seeds')
	}
};

module.exports = { development };

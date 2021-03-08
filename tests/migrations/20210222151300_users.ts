import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', tbl => {
		tbl.increments('id');
		tbl.string('email');
		tbl.string('name');
		tbl.string('password');
		tbl.string('username');
		tbl.string('key');
		tbl.string('createdAt');
		tbl.boolean('verified').defaultTo(false);
		tbl.string('avatar');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('users');
}

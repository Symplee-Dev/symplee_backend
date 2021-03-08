import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('admin_users', tbl => {
		tbl.increments('id');
		tbl.string('username');
		tbl.string('email');
		tbl.string('name');
		tbl.string('password');
		tbl.integer('pin');
		tbl.string('created_at');
		tbl.boolean('verified').defaultTo(false);
		tbl.string('key');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('admin_users');
}

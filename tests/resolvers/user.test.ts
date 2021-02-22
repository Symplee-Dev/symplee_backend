import initDb from '../utils/initDB';
import { setupServer } from '../utils/setupServer';
import { createTestClient } from 'apollo-server-testing';
import { CREATE_USER } from './mutation_templates';
import faker from 'faker';
import * as Knex from 'knex';

const user = {
	email: 'nrichardsbusiness@gmail.com',
	name: faker.name.firstName(),
	username: faker.internet.userName(),
	password: faker.internet.password(),
	avatar: faker.internet.avatar()
};

describe('user tests', () => {
	// get the in memory DB instance
	let knex: Knex;

	beforeAll(async done => {
		process.env.NODE_ENV = 'test';
		knex = await initDb();
		// Create all tables from migrations
		await knex.migrate.latest();

		console.log = () => {};

		done();
	});

	afterAll(async done => {
		await knex.destroy();

		done();
	});

	test('can create a user', async done => {
		const server = setupServer();

		const client = createTestClient(server);

		const res = await client.mutate({
			mutation: CREATE_USER,
			variables: { user: user }
		});

		expect(res.errors).toBeUndefined();

		expect(res.data.signup.name).toBe(user.name);

		done();
	});
});

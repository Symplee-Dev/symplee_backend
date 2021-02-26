import { createTestClient } from 'apollo-server-testing';
import e from 'express';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import * as Knex from 'knex';
import initDB from '../utils/initDB';
import { setupServer } from '../utils/setupServer';
import { AdminMutationTemps } from './mutation_templates';

const basicInfo = {
	name: `${faker.name.firstName()} ${faker.name.lastName()}`,
	email: 'Jtamedrano@gmail.com'
};
const testToken = jwt.sign(basicInfo, 'supersecret', {
	expiresIn: '7d'
});
const admin = {
	token: testToken,
	name: faker.name.firstName(),
	email: faker.internet.email(),
	username: faker.internet.userName(),
	password: faker.internet.password(),
	pin: faker.random.number({ min: 1000, max: 9999 })
};

describe('admin tests', () => {
	let knex: Knex;

	beforeAll(async done => {
		process.env.NODE_ENV = 'test';
		knex = await initDB();

		await knex.migrate.latest();

		done();
	});

	afterAll(async done => {
		await knex.destroy();

		done();
	});

	test('Can Send Invite Email', async done => {
		const server = setupServer();

		const client = createTestClient(server);

		const res = await client.mutate({
			mutation: AdminMutationTemps.SEND_EMAIL,
			variables: { admin: basicInfo }
		});

		expect(res.errors).toBeUndefined();

		expect(res.data.sendAdminInvite).toBe(true);

		done();
	});
	test('Can create an admin', async done => {
		const server = setupServer();
		const client = createTestClient(server);
		const newAdmin = admin;
		const res = await client.mutate({
			mutation: AdminMutationTemps.CREATE_ADMIN,
			variables: { admin: newAdmin }
		});
		expect(res.errors).toBeUndefined();

		expect(res.data).not.toBeNull();
		expect(res.data.createAdmin.verified).toBe(true);
		expect(res.data.createAdmin.name).toBe(newAdmin.name);

		done();
	});
});

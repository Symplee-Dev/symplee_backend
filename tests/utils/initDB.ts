import Knex from 'knex';

import { Model } from 'objection';
const config = require('../knexfile');

export default async (): Promise<Knex> => {
	const knex = Knex(config.development);

	Model.knex(knex);

	return knex;
};

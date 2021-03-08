import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../../src/schema/typeDefs';
import { resolvers } from '../../src/resolvers/index';
import dotenv from 'dotenv';
import { initializeConfig } from '../../src/utils/InitializeConfig';
import { logger } from '../../src/utils/logger';
import { createContext } from '../../src/Services/Context';
import e from 'express';
import express from 'express';

export const setupServer = (): ApolloServer => {
	dotenv.config();
	initializeConfig();

	const server = new ApolloServer({
		typeDefs: typeDefs,
		resolvers: resolvers as any,
		context: async ({ req, res }: { req: e.Request; res: e.Response }) => {
			logger.info('Running Context');
			return await createContext({ headers: {} } as any, res);
		}
	});

	return server;
};

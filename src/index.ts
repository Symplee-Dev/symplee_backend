import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import e from 'express';
import { initializeConfig } from './utils/InitializeConfig';
import { logger } from './utils/logger';
import { createContext } from './Services/Context';
import initializeMiddleware from './utils/InitializeMiddleware';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers/index';
import dotenv from 'dotenv';

// Init Config Variables
dotenv.config();
export const Config = initializeConfig();

const PORT = process.env.PORT;

console.log('Starting Server....');

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	context: async ({ req, res }: { req: e.Request; res: e.Response }) => {
		logger.info('Running Context');
		return await createContext(req, res);
	}
});

const app = express();

initializeMiddleware(app);

console.log(Config);

app.listen({ port: Config.PORT }, () =>
	console.info(
		`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
	)
);

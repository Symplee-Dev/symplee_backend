import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import e from 'express';
import { initializeConfig } from './utils/InitializeConfig';
import { logger } from './utils/logger';
import { createContext } from './Services/Context';

// Init Config Variables
export const Config = initializeConfig();

logger.info('Starting Server....');

const server = new ApolloServer({
	typeDefs: ___,
	resolvers: ____,
	context: async ({ req, res }: { req: e.Request; res: e.Response }) => {
		logger.info('Running Context');
		return await createContext(req, res);
	}
});

const app = express();

server.applyMiddleware({ app });

app.listen({ port: Config.PORT }, () =>
	console.info(
		`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
	)
);

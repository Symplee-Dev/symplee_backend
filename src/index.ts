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
import { initSentry } from './Services/Sentry';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createServer } from 'http';

// Init Config Variables
dotenv.config();
export const Config = initializeConfig();

const PORT = process.env.PORT;

console.log('Starting Server....');

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers as any,
	context: async ({ req, res }: { req: e.Request; res: e.Response }) => {
		logger.info('Running Context');

		return await createContext(req, res);
	},
	subscriptions: {
		path: '/subscriptions',
		onConnect: (connectionParams, webSocket, context) => {
			logger.info('Connected!');
		},
		onDisconnect: (webSocket, context) => {
			logger.warn('Disconnected!');
		}
	}
});

export const pubsub = new RedisPubSub({
	connection: {
		host: Config.REDIS_HOST,
		port: Number(Config.REDIS_PORT),
		password: Config.REDIS_PASSWORD
	}
});

const app = express();

initializeMiddleware(app);

console.log(Config);

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

initSentry();

if (process.env.NODE_ENV !== 'test') {
	httpServer.listen(Config.PORT, () => {
		console.log(
			`🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.subscriptionsPath}`
		);
		console.info(
			`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
}

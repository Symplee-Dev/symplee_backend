import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import http from 'http';
import { Config } from '../index';

export const initSentry = () => {
	Sentry.init({
		dsn: Config.SENTRY_DSN,
		integrations: [new Sentry.Integrations.Http({ tracing: true })],
		// We recommend adjusting this value in production, or using tracesSampler
		// for finer control
		tracesSampleRate: 1.0
	});

	const transaction = Sentry.startTransaction({
		op: 'transaction',
		name: 'Graphql Transaction'
	});

	Sentry.configureScope(scope => {
		scope.setSpan(transaction);
	});
};

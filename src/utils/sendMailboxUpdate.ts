import { v4 } from 'uuid';
import { pubsub } from '../index';
export interface SendMailboxUpdateArgs {
	title: string;
	body: string;
	goTo: string;
	userId: number;
}

const sendMailboxUpdate = async ({
	title,
	body,
	goTo,
	userId
}: SendMailboxUpdateArgs): Promise<void> => {
	const update = {
		id: v4(),
		body,
		title,
		goTo,
		userId,
		createdAt: new Date().toString()
	};

	await pubsub.publish('MAILBOX_UPDATE', update);
};

export default sendMailboxUpdate;

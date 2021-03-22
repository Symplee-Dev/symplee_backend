import User from '../models/User';

export const getCallMembers = async (
	parent: any,
	args: Resolvers.QueryGetCallMembersArgs,
	context: Services.ServerContext
) => {
	context.logger.info('Getting members for call');

	const proms: Promise<any>[] = [];

	for (let i = 0; i < args.members.length; i++) {
		const split = args.members[i].split('#');
		proms.push(User.query().where({ username: split[0], key: split[1] }));
	}

	await Promise.all(proms);

	return proms;
};

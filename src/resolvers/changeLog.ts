import ChangeLog from '../models/ChangeLogModel';

export const changeLogById = async (
	parent: any,
	args: Resolvers.QueryChangeLogByIdArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChangeLog> => {
	const { id } = args;

	const changeLog = ChangeLog.query().where({ id }).first();

	return changeLog;
};

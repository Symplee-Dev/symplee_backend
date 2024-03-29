import ChangeLog from '../models/ChangeLogModel';

export const latestChangeLog = async (
	parent: any,
	args: {},
	context: Services.ServerContext
): Promise<Resolvers.ChangeLog> => {
	const latest = await ChangeLog.query().orderBy('version', 'desc').first();
	return latest;
};

export const changeLogs = async (
	parent: any,
	args: {},
	context: Services.ServerContext
): Promise<Resolvers.ChangeLog[]> => {
	const changeLogs = await ChangeLog.query().orderBy('version', 'desc');
	return changeLogs;
};

export const changeLogById = async (
	parent: any,
	args: Resolvers.QueryChangeLogByIdArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChangeLog> => {
	const { id } = args;

	const changeLog = ChangeLog.query().where({ id }).first();

	return changeLog;
};

export const addNewChangeLog = async (
	parent: any,
	args: Resolvers.MutationAddNewChangeLogArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChangeLog> => {
	context.logger.info('Resolvers: Mutation: addChangeLog');

	const { version, body, changes } = args.newChangeLog;

	console.info(args.newChangeLog);

	context.logger.warn(
		'Resolvers: Mutation: addChangeLog: trying to add a new change log: ' +
			'Version: ' +
			version +
			'\n',
		changes &&
			changes?.length > 0 &&
			'Changes:\n' +
				changes.forEach((change, i) => `${i + 1} - ${change}\n`),
		body && `body:\n${body}`
	);

	let newVersion: string = version;

	while (newVersion.includes(' ')) {
		if (!newVersion.includes(' ')) {
			break;
		}
		newVersion = newVersion.replace(' ', '');
	}

	newVersion = newVersion.substr(0, 1).toUpperCase() + newVersion.substr(1);
	// Check if version exist
	const foundVersion = await ChangeLog.query()
		.where({ version: newVersion })
		.first();

	if (foundVersion) {
		throw new Error('Version already in exist!');
	}

	// Check if version is null;
	const noVersion = newVersion === '' || newVersion === null || !newVersion;

	if (noVersion) {
		throw new Error('No version entered');
	}

	// Check if there is atleast a change array or body
	const noBody = body === undefined || body === '' || body === null;
	const noChangeArray =
		changes === undefined || changes.length === 0 || body === null;

	if (noBody && noChangeArray) {
		throw new Error(
			'Now Changes to share. Please add what changes have taken place in either body as a string or changes as an array.'
		);
	}

	const now = new Date().toString();
	const newChangeLog = await ChangeLog.query().insertAndFetch({
		body,
		changes,
		version: newVersion,
		created_at: now,
		updated_at: now
	});

	context.logger.info('Change Log created with id of', newChangeLog.id);
	return newChangeLog;
};

export const editChangeLog = async (
	parent: any,
	args: Resolvers.MutationEditChangeLogArgs,
	context: Services.ServerContext
): Promise<Resolvers.ChangeLog> => {
	const { id, changeLogEdit } = args;

	const query = ChangeLog.query().findById(id).first();
	// Check if id returns Checklog
	if (!query.has('version')) {
		throw new Error('Change Log does not exist');
	}

	const updatedChangeLog = await ChangeLog.query().patchAndFetchById(id, {
		version: changeLogEdit?.version,
		body: changeLogEdit?.body,
		changes: changeLogEdit?.changes,
		updated_at: new Date().toString()
	});

	return updatedChangeLog;
};

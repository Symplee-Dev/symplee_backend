import { ApolloError } from 'apollo-server-errors';
import ChatGroup from '../models/ChatGroup';
import UserRoles from '../models/UserRoles';

const userRoleInGroupById = async (id: number): Promise<boolean> => {
	const u = await UserRoles.query().where('id', id).first();
	return !!u;
};
const userRoleInGroup = async (
	groupId: number,
	userId: number
): Promise<boolean> => {
	const u = await UserRoles.query()
		.where('group_id', groupId)
		.where('user_id', userId)
		.first();
	return !!u;
};

const groupExist = async (groupId: number) => {
	const g = await ChatGroup.query().where('id', groupId).first();
	return !!g;
};

export const createUserRole = async (
	parent: any,
	args: Resolvers.MutationCreateUserRoleArgs,
	context: Services.ServerContext
): Promise<UserRoles> => {
	context.logger.info('Mutation Add UserRole');

	const { groupId, userId, role, roleIndex } = args.role;

	if (!groupId && !userId && !role && !roleIndex)
		throw new ApolloError('Not enough info to proceed', '400');

	const userExistInGroup: boolean = await userRoleInGroup(groupId, userId);

	if (userExistInGroup) throw new ApolloError('User Exist', '400');

	const newRole = await UserRoles.query()
		.insertAndFetch({
			groupId,
			userId,
			role,
			roleIndex
		})
		.withGraphFetched({ user: true, chatGroup: true });

	if (!newRole) throw new ApolloError('Something wrong happend', '500');

	return newRole;
};

export const getUserRoles = async (
	parent: any,
	args: Resolvers.QueryGetUserRolesArgs,
	context: Services.ServerContext
): Promise<UserRoles[]> => {
	context.logger.info('Query Get User Roles');

	const { groupId } = args;

	if (!groupExist(groupId)) [];

	return await UserRoles.query()
		.where('group_id', groupId)
		.withGraphFetched({ user: true, chatGroup: true });
};

export const editUserRole = async (
	parent: any,
	args: Resolvers.MutationEditUserRoleArgs,
	context: Services.ServerContext
): Promise<UserRoles> => {
	context.logger.info('Editing User Role for user_id' + args.editRole.userId);

	const { groupId, role, roleIndex, userId } = args.editRole;
	if (!groupId && !role && !roleIndex && !userId)
		throw new ApolloError('Not enough information to procced', '404');

	if (!userRoleInGroup(groupId, userId))
		throw new ApolloError("Role doesn't exist", '404');

	const update = await UserRoles.query()
		.where('group_id', groupId)
		.where('user_id', userId)
		.first();

	return await UserRoles.query()
		.patchAndFetchById(update.id, { role, roleIndex })
		.withGraphFetched({ user: true, chatGroup: true });
};

export const deleteUserRole = async (
	parent: any,
	args: Resolvers.MutationDeleteUserRoleArgs,
	context: Services.ServerContext
): Promise<boolean> => {
	const { id } = args;
	context.logger.info('Deleting User Role ' + id);

	const exist = await userRoleInGroupById(id);

	if (!exist) throw new ApolloError("Group doesn't exist", '404');

	try {
		await UserRoles.query().deleteById(id);
		return true;
	} catch (error) {
		throw new ApolloError('Failed to delete group', '500');
	}
};

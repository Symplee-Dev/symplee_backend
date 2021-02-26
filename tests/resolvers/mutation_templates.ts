import gql from 'graphql-tag';

// User GQL Templates

export const CREATE_USER = gql`
	mutation CreateUser($user: UserInput!) {
		signup(user: $user) {
			id
			email
			name
			username
			key
			createdAt
			verified
			avatar
		}
	}
`;

/**
 *
 * Admin GQL Templates
 *
 * 1) CreateAdmin
 * 2) SendEmailInvite
 */

namespace AdminMutationTemps {
	export const CREATE_ADMIN = gql`
		mutation CreateAdmin($admin: AdminInput!) {
			createAdmin(admin: $admin) {
				id
				username
				email
				name
				password
				pin
				created_at
				verified
				key
				token
			}
		}
	`;
	export const SEND_EMAIL = gql`
		mutation CreateAdmin($admin: AdminInviteInput!) {
			sendAdminInvite(admin: $admin)
		}
	`;
}
export { AdminMutationTemps };

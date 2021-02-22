import gql from 'graphql-tag';

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

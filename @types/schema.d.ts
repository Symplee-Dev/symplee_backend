declare global { namespace Schema {
type Maybe<T> = T | undefined;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

interface Query {
  __typename?: 'Query';
  test: Scalars['String'];
  user?: Maybe<User>;
}


interface QueryUserArgs {
  id: Scalars['Int'];
}

interface Mutation {
  __typename?: 'Mutation';
  signup: User;
  login?: Maybe<LoginReturn>;
}


interface MutationSignupArgs {
  user: UserInput;
}


interface MutationLoginArgs {
  credentials: LoginInput;
}

interface LoginInput {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}

interface LoginReturn {
  __typename?: 'LoginReturn';
  authenticated: Scalars['Boolean'];
  token: Scalars['String'];
}

interface UserInput {
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}

interface Schema {
  __typename?: 'schema';
  query?: Maybe<Query>;
}

interface User {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  key: Scalars['String'];
}

} } export {};
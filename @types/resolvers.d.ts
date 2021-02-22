import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
declare global { namespace Resolvers {
type Maybe<T> = T | undefined;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  user: User;
  changeLogById: ChangeLog;
  changeLogs: Array<ChangeLog>;
  serverStatus: Scalars['Boolean'];
  chatGroup: ChatGroup;
  hasChat: Scalars['Boolean'];
  getFeedback: Array<AppFeedback>;
  feedbackById: AppFeedback;
}


interface QueryUserArgs {
  id: Scalars['Int'];
}


interface QueryChangeLogByIdArgs {
  id: Scalars['Int'];
}


interface QueryChatGroupArgs {
  id: Scalars['Int'];
}


interface QueryHasChatArgs {
  userId: Scalars['Int'];
  chatId: Scalars['Int'];
}


interface QueryFeedbackByIdArgs {
  id: Scalars['Int'];
}

interface Mutation {
  __typename?: 'Mutation';
  signup: User;
  login?: Maybe<LoginReturn>;
  verifyEmail: Scalars['Boolean'];
  createChat: Chat;
  createChatGroup: ChatGroup;
  addNewChangeLog: ChangeLog;
  editChangeLog?: Maybe<ChangeLog>;
  sendFeedback: AppFeedback;
  toggleFeedbackResolved: AppFeedback;
}


interface MutationSignupArgs {
  user: UserInput;
}


interface MutationLoginArgs {
  credentials: LoginInput;
}


interface MutationVerifyEmailArgs {
  token: Scalars['String'];
}


interface MutationCreateChatArgs {
  chat: CreateChatInput;
}


interface MutationCreateChatGroupArgs {
  chatGroup: CreateChatGroupInput;
}


interface MutationAddNewChangeLogArgs {
  newChangeLog: NewChangeLogInput;
}


interface MutationEditChangeLogArgs {
  id: Scalars['Int'];
  changeLogEdit: NewChangeLogInput;
}


interface MutationSendFeedbackArgs {
  feedback: SendAppFeedbackInput;
}


interface MutationToggleFeedbackResolvedArgs {
  id: Scalars['Int'];
  status: Scalars['Boolean'];
}

interface AppFeedback {
  __typename?: 'AppFeedback';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
  userEmail: Scalars['String'];
  resolved: Scalars['Boolean'];
  body: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  sentryErrorUrl?: Maybe<Scalars['String']>;
  logRocketErrorUrl?: Maybe<Scalars['String']>;
}

interface SendAppFeedbackInput {
  userName?: Maybe<Scalars['String']>;
  userEmail: Scalars['String'];
  body: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  sentryErrorUrl?: Maybe<Scalars['String']>;
  logRocketErrorUrl?: Maybe<Scalars['String']>;
}

interface CreateChatInput {
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  userId: Scalars['Int'];
  icon: Scalars['String'];
  chatGroupId: Scalars['Int'];
}

interface CreateChatGroupInput {
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  userId: Scalars['Int'];
}

interface LoginInput {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}

interface ChangeLog {
  __typename?: 'ChangeLog';
  id: Scalars['Int'];
  body: Scalars['String'];
  changes: Array<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  version: Scalars['String'];
}

interface LoginReturn {
  __typename?: 'LoginReturn';
  authenticated: Scalars['Boolean'];
  token: Scalars['String'];
}

interface NewChangeLogInput {
  body: Scalars['String'];
  changes: Array<Scalars['String']>;
  version: Scalars['String'];
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
  chatGroups: Array<ChatGroup>;
  createdAt: Scalars['String'];
  verified: Scalars['Boolean'];
}

interface ChatGroup {
  __typename?: 'ChatGroup';
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdAt: Scalars['String'];
  chats: Array<Maybe<Chat>>;
  createdBy: Scalars['Int'];
}

interface Chat {
  __typename?: 'Chat';
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdById: Scalars['Int'];
  messages: Array<Maybe<Message>>;
  icon: Scalars['String'];
}

interface Message {
  __typename?: 'Message';
  id: Scalars['Int'];
  body: Scalars['String'];
  authorId: Scalars['Int'];
  chatId: Scalars['Int'];
  createdAt: Scalars['String'];
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  AppFeedback: ResolverTypeWrapper<AppFeedback>;
  SendAppFeedbackInput: SendAppFeedbackInput;
  CreateChatInput: CreateChatInput;
  CreateChatGroupInput: CreateChatGroupInput;
  LoginInput: LoginInput;
  ChangeLog: ResolverTypeWrapper<ChangeLog>;
  LoginReturn: ResolverTypeWrapper<LoginReturn>;
  NewChangeLogInput: NewChangeLogInput;
  UserInput: UserInput;
  schema: ResolverTypeWrapper<Schema>;
  User: ResolverTypeWrapper<User>;
  ChatGroup: ResolverTypeWrapper<ChatGroup>;
  Chat: ResolverTypeWrapper<Chat>;
  Message: ResolverTypeWrapper<Message>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  Mutation: {};
  AppFeedback: AppFeedback;
  SendAppFeedbackInput: SendAppFeedbackInput;
  CreateChatInput: CreateChatInput;
  CreateChatGroupInput: CreateChatGroupInput;
  LoginInput: LoginInput;
  ChangeLog: ChangeLog;
  LoginReturn: LoginReturn;
  NewChangeLogInput: NewChangeLogInput;
  UserInput: UserInput;
  schema: Schema;
  User: User;
  ChatGroup: ChatGroup;
  Chat: Chat;
  Message: Message;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  test?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  changeLogById?: Resolver<ResolversTypes['ChangeLog'], ParentType, ContextType, RequireFields<QueryChangeLogByIdArgs, 'id'>>;
  changeLogs?: Resolver<Array<ResolversTypes['ChangeLog']>, ParentType, ContextType>;
  serverStatus?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chatGroup?: Resolver<ResolversTypes['ChatGroup'], ParentType, ContextType, RequireFields<QueryChatGroupArgs, 'id'>>;
  hasChat?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryHasChatArgs, 'userId' | 'chatId'>>;
  getFeedback?: Resolver<Array<ResolversTypes['AppFeedback']>, ParentType, ContextType>;
  feedbackById?: Resolver<ResolversTypes['AppFeedback'], ParentType, ContextType, RequireFields<QueryFeedbackByIdArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'user'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginReturn']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'credentials'>>;
  verifyEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'token'>>;
  createChat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'chat'>>;
  createChatGroup?: Resolver<ResolversTypes['ChatGroup'], ParentType, ContextType, RequireFields<MutationCreateChatGroupArgs, 'chatGroup'>>;
  addNewChangeLog?: Resolver<ResolversTypes['ChangeLog'], ParentType, ContextType, RequireFields<MutationAddNewChangeLogArgs, 'newChangeLog'>>;
  editChangeLog?: Resolver<Maybe<ResolversTypes['ChangeLog']>, ParentType, ContextType, RequireFields<MutationEditChangeLogArgs, 'id' | 'changeLogEdit'>>;
  sendFeedback?: Resolver<ResolversTypes['AppFeedback'], ParentType, ContextType, RequireFields<MutationSendFeedbackArgs, 'feedback'>>;
  toggleFeedbackResolved?: Resolver<ResolversTypes['AppFeedback'], ParentType, ContextType, RequireFields<MutationToggleFeedbackResolvedArgs, 'id' | 'status'>>;
};

export type AppFeedbackResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppFeedback'] = ResolversParentTypes['AppFeedback']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resolved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sentryErrorUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logRocketErrorUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeLogResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeLog'] = ResolversParentTypes['ChangeLog']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  changes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginReturn'] = ResolversParentTypes['LoginReturn']> = {
  authenticated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchemaResolvers<ContextType = any, ParentType extends ResolversParentTypes['schema'] = ResolversParentTypes['schema']> = {
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chatGroups?: Resolver<Array<ResolversTypes['ChatGroup']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatGroup'] = ResolversParentTypes['ChatGroup']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isPublic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chats?: Resolver<Array<Maybe<ResolversTypes['Chat']>>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isPublic?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdById?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  messages?: Resolver<Array<Maybe<ResolversTypes['Message']>>, ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chatId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AppFeedback?: AppFeedbackResolvers<ContextType>;
  ChangeLog?: ChangeLogResolvers<ContextType>;
  LoginReturn?: LoginReturnResolvers<ContextType>;
  schema?: SchemaResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ChatGroup?: ChatGroupResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

} } export {};
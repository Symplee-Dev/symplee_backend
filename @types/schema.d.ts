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
  user: User;
  admin: Admin;
  changeLogById: ChangeLog;
  changeLogs: Array<ChangeLog>;
  latestChangeLog: ChangeLog;
  serverStatus: Scalars['Boolean'];
  chatGroup: ChatGroup;
  hasChat: Scalars['Boolean'];
  getFeedback: Array<AppFeedback>;
  feedbackById: AppFeedback;
  getMembers: Array<User>;
  getMessages: Array<Maybe<MessagesChats>>;
  getNotifications: Array<Maybe<Notification>>;
  getFriends: Array<Maybe<UserFriend>>;
  searchGroups: Array<Maybe<ChatGroup>>;
  getProfile: GetProfileReturn;
  getAcceptedFriends: Array<Maybe<UserFriend>>;
  getPendingFriends: Array<Maybe<UserFriend>>;
  getBlockedFriends: Array<Maybe<UserFriend>>;
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


interface QueryGetMembersArgs {
  chatId: Scalars['Int'];
}


interface QueryGetMessagesArgs {
  chatId: Scalars['Int'];
}


interface QueryGetNotificationsArgs {
  userId: Scalars['Int'];
  type: Scalars['String'];
}


interface QueryGetFriendsArgs {
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
}


interface QuerySearchGroupsArgs {
  queryString: Scalars['String'];
}


interface QueryGetProfileArgs {
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
}


interface QueryGetAcceptedFriendsArgs {
  userId: Scalars['Int'];
}


interface QueryGetPendingFriendsArgs {
  userId: Scalars['Int'];
}


interface QueryGetBlockedFriendsArgs {
  userId: Scalars['Int'];
}

interface GetProfileReturn {
  __typename?: 'GetProfileReturn';
  user: User;
  relatedGroups: Array<Maybe<ChatGroup>>;
}

interface Mutation {
  __typename?: 'Mutation';
  sendForgotPasswordEmail: Scalars['Boolean'];
  signup: User;
  login?: Maybe<LoginReturn>;
  sendAdminInvite: Scalars['Boolean'];
  createAdmin: NewAdmin;
  adminLogin?: Maybe<LoginReturn>;
  verifyEmail: Scalars['Boolean'];
  createChat: Chat;
  createChatGroup: ChatGroup;
  addNewChangeLog: ChangeLog;
  editChangeLog?: Maybe<ChangeLog>;
  sendFeedback: AppFeedback;
  deleteFeedback: Scalars['Boolean'];
  toggleFeedbackResolved: AppFeedback;
  updateUser: User;
  updateChatGroup: ChatGroup;
  sendMessage: Scalars['Boolean'];
  sendInvite: Scalars['String'];
  acceptInvite: Scalars['Boolean'];
  declineInvite: Scalars['Boolean'];
  markNotificationAsRead: Scalars['Boolean'];
  toggleUserOnline: Scalars['Boolean'];
  addFriend: Scalars['Boolean'];
  removeFriend: Scalars['Boolean'];
  acceptFriend: Scalars['Boolean'];
  declineFriend: Scalars['Boolean'];
  joinGroup: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
  deleteChatChannel: Scalars['Boolean'];
  editMessage: MessagesChats;
  deleteMessage: Scalars['Boolean'];
  userTyping: Scalars['Boolean'];
  acceptInviteByLink: ErrorCode;
  inviteByLink: Scalars['Boolean'];
  blockUser: Scalars['Boolean'];
  unblockUser: Scalars['Boolean'];
}


interface MutationSendForgotPasswordEmailArgs {
  email: Scalars['String'];
  origin?: Maybe<Scalars['String']>;
}


interface MutationSignupArgs {
  user: UserInput;
}


interface MutationLoginArgs {
  credentials: LoginInput;
}


interface MutationSendAdminInviteArgs {
  admin: AdminInviteInput;
}


interface MutationCreateAdminArgs {
  admin: AdminInput;
}


interface MutationAdminLoginArgs {
  credentials: AdminLoginInput;
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


interface MutationDeleteFeedbackArgs {
  id: Scalars['Int'];
}


interface MutationToggleFeedbackResolvedArgs {
  id: Scalars['Int'];
  status: Scalars['Boolean'];
}


interface MutationUpdateUserArgs {
  user: UpdateUserInput;
  userId?: Maybe<Scalars['Int']>;
}


interface MutationUpdateChatGroupArgs {
  group?: Maybe<UpdateChatGroupInput>;
  chatGroupId: Scalars['Int'];
}


interface MutationSendMessageArgs {
  message: NewMessage;
}


interface MutationSendInviteArgs {
  invite: SendInviteInput;
}


interface MutationAcceptInviteArgs {
  acceptArgs: AcceptInviteInput;
}


interface MutationDeclineInviteArgs {
  declineArgs: DeclineInviteInput;
}


interface MutationMarkNotificationAsReadArgs {
  notificationId: Scalars['Int'];
}


interface MutationToggleUserOnlineArgs {
  status?: Maybe<Scalars['Boolean']>;
}


interface MutationAddFriendArgs {
  friendRequest: FriendRequestInput;
}


interface MutationRemoveFriendArgs {
  friendId: Scalars['Int'];
  userId: Scalars['Int'];
}


interface MutationAcceptFriendArgs {
  notificationId: Scalars['Int'];
  invite: AcceptFriendInput;
}


interface MutationDeclineFriendArgs {
  notificationId: Scalars['Int'];
  invite: DeclineFriendInput;
}


interface MutationJoinGroupArgs {
  groupId: Scalars['Int'];
  userId: Scalars['Int'];
}


interface MutationDeleteGroupArgs {
  chatGroupId: Scalars['Int'];
}


interface MutationDeleteChatChannelArgs {
  chatChannelId: Scalars['Int'];
}


interface MutationEditMessageArgs {
  message: InEditMessage;
}


interface MutationDeleteMessageArgs {
  messageId: Scalars['Int'];
}


interface MutationUserTypingArgs {
  chatId: Scalars['Int'];
  userId: Scalars['Int'];
  username: Scalars['String'];
}


interface MutationAcceptInviteByLinkArgs {
  token: Scalars['String'];
}


interface MutationInviteByLinkArgs {
  userId: Scalars['Int'];
  groupId: Scalars['Int'];
  otherUserId: Scalars['Int'];
  uses: Scalars['Int'];
}


interface MutationBlockUserArgs {
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
}


interface MutationUnblockUserArgs {
  userId: Scalars['Int'];
  otherUserId: Scalars['Int'];
}

type ErrorCode =
  | 'ALREADY_FAILURE'
  | 'SUCCESS';

interface DeclineFriendInput {
  userId: Scalars['Int'];
  fromId: Scalars['Int'];
}

interface AcceptFriendInput {
  userId: Scalars['Int'];
  fromId: Scalars['Int'];
}

interface FriendRequestInput {
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
}

interface InEditMessage {
  id: Scalars['Int'];
  body: Scalars['String'];
}

interface Subscription {
  __typename?: 'Subscription';
  messageSent: MessagesChats;
  activeChatUsers: Array<User>;
  messageEdited: MessagesChats;
  messageDeleted: Scalars['Int'];
  userTyping?: Maybe<UserTypingReturn>;
  mailboxUpdate: UserMailbox;
}


interface SubscriptionMessageSentArgs {
  chatId: Scalars['Int'];
}


interface SubscriptionActiveChatUsersArgs {
  chatId: Scalars['Int'];
}


interface SubscriptionMessageEditedArgs {
  chatId: Scalars['Int'];
}


interface SubscriptionMessageDeletedArgs {
  chatId: Scalars['Int'];
}


interface SubscriptionUserTypingArgs {
  chatId: Scalars['Int'];
}


interface SubscriptionMailboxUpdateArgs {
  userId: Scalars['Int'];
}

interface UserTypingReturn {
  __typename?: 'UserTypingReturn';
  userId: Scalars['Int'];
  username: Scalars['String'];
  chatId: Scalars['Int'];
}

interface SendInviteInput {
  fromId: Scalars['Int'];
  uses: Scalars['Int'];
  to: Array<Maybe<Scalars['Int']>>;
  groupId: Scalars['Int'];
}

interface AcceptInviteInput {
  userId: Scalars['Int'];
  code: Scalars['String'];
  notificationId: Scalars['Int'];
}

interface DeclineInviteInput {
  userId: Scalars['Int'];
  code: Scalars['String'];
  notificationId: Scalars['Int'];
}

interface NewMessage {
  body: Scalars['String'];
  authorUsername: Scalars['String'];
  authorId: Scalars['Int'];
  chatId: Scalars['Int'];
}

interface AdminInviteInput {
  name: Scalars['String'];
  email: Scalars['String'];
}

interface UpdateChatGroupInput {
  name?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
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
  avatar?: Maybe<Scalars['String']>;
}

interface LoginInput {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
}

interface AdminLoginInput {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  pin: Scalars['Int'];
}

interface Admin {
  __typename?: 'Admin';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  pin: Scalars['Int'];
  created_at: Scalars['String'];
  verified: Scalars['Boolean'];
  key: Scalars['String'];
}

interface NewAdmin {
  __typename?: 'NewAdmin';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  pin: Scalars['Int'];
  created_at: Scalars['String'];
  verified: Scalars['Boolean'];
  key: Scalars['String'];
  token: Scalars['String'];
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
  avatar?: Maybe<Scalars['String']>;
}

interface UpdateUserInput {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}

interface AdminInput {
  token: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  pin: Scalars['Int'];
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
  avatar?: Maybe<Scalars['String']>;
  is_online: Scalars['Boolean'];
}

interface ChatGroup {
  __typename?: 'ChatGroup';
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdAt: Scalars['String'];
  chats: Array<Maybe<Chat>>;
  createdBy: Scalars['Int'];
  avatar?: Maybe<Scalars['String']>;
  members: Array<User>;
}

interface Chat {
  __typename?: 'Chat';
  id: Scalars['Int'];
  name: Scalars['String'];
  isPublic: Scalars['Boolean'];
  createdById: Scalars['Int'];
  messages: Array<Maybe<MessagesChats>>;
  icon: Scalars['String'];
}

interface MessagesChats {
  __typename?: 'MessagesChats';
  id: Scalars['Int'];
  body: Scalars['String'];
  authorUsername: Scalars['String'];
  authorId: Scalars['Int'];
  chatId: Scalars['Int'];
  createdAt: Scalars['String'];
  author: User;
}

interface GroupInvite {
  __typename?: 'GroupInvite';
  id: Scalars['Int'];
  fromId: Scalars['Int'];
  fromAuthor: User;
  code: Scalars['String'];
  uses: Scalars['Int'];
  used: Scalars['Int'];
  groupId: Scalars['Int'];
  group: ChatGroup;
}

interface Notification {
  __typename?: 'Notification';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  description: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  fromId?: Maybe<Scalars['Int']>;
  from?: Maybe<User>;
  createdAt: Scalars['String'];
  read: Scalars['Boolean'];
  code?: Maybe<Scalars['String']>;
}

interface UserFriend {
  __typename?: 'UserFriend';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  friendId: Scalars['Int'];
  friend?: Maybe<User>;
  friendsSince: Scalars['String'];
  status: Scalars['String'];
  sentBy: Scalars['Int'];
  blockedBy?: Maybe<Scalars['Int']>;
}

interface UserMailbox {
  __typename?: 'UserMailbox';
  id: Scalars['Int'];
  body: Scalars['String'];
  title: Scalars['String'];
  goTo: Array<Maybe<Scalars['String']>>;
  userId: Scalars['Int'];
}

interface UserDm {
  __typename?: 'UserDM';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  users: Array<Scalars['Int']>;
  messages: Array<Maybe<UserDmMessages>>;
}

interface UserDmMessages {
  __typename?: 'UserDMMessages';
  id: Scalars['Int'];
  body: Scalars['String'];
  authorUsername: Scalars['String'];
  authorId: Scalars['Int'];
  author: User;
  createdAt: Scalars['String'];
  dmId: Scalars['Int'];
}

} } export {};
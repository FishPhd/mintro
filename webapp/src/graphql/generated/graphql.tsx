import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type City = {
  __typename?: 'City';
  countryCode: Scalars['String'];
  countryId: Scalars['Float'];
  createdAt: Scalars['String'];
  flag: Scalars['Float'];
  id: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  stateCode: Scalars['String'];
  stateId: Scalars['Float'];
  updatedAt: Scalars['String'];
  wikiDataId: Scalars['String'];
};

export type ContactType = {
  __typename?: 'ContactType';
  color1?: Maybe<Scalars['String']>;
  color2?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  placeholder: Scalars['String'];
  profileUrlTemplate?: Maybe<Scalars['String']>;
  socialMedia: Scalars['Boolean'];
  updatedAt: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  capital: Scalars['String'];
  createdAt: Scalars['String'];
  currency: Scalars['String'];
  currencySymbol: Scalars['String'];
  emoji: Scalars['String'];
  emojiU: Scalars['String'];
  flag: Scalars['Float'];
  id: Scalars['Float'];
  iso2: Scalars['String'];
  iso3: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  native: Scalars['String'];
  phonecode: Scalars['String'];
  region: Scalars['String'];
  subregion: Scalars['String'];
  timezones: Scalars['String'];
  tld: Scalars['String'];
  translations: Scalars['String'];
  updatedAt: Scalars['String'];
  wikiDataId: Scalars['String'];
};


export type Feedback = {
  __typename?: 'Feedback';
  createdAt: Scalars['String'];
  feedback: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  userId?: Maybe<Scalars['Float']>;
};

export type FeedbackResponse = {
  __typename?: 'FeedbackResponse';
  errors?: Maybe<Array<FieldError>>;
  feedback?: Maybe<Feedback>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message?: Maybe<Array<Scalars['String']>>;
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  groupImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  memberCount: Scalars['Float'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type GroupResponse = {
  __typename?: 'GroupResponse';
  errors?: Maybe<Array<FieldError>>;
  group?: Maybe<Group>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addContact: UserContactResponse;
  addProfileImage: UserResponse;
  changePassword: UserResponse;
  createGroup: GroupResponse;
  createSection: SectionResponse;
  deleteGroup: Scalars['Boolean'];
  deleteSection: Scalars['Boolean'];
  editGroup: GroupResponse;
  forgotPassword: Scalars['Boolean'];
  getS3SignedUrl: S3Response;
  joinGroup: GroupResponse;
  leaveGroup: GroupResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  setupProfile?: Maybe<UserResponse>;
  submitFeedback: FeedbackResponse;
  updateRank: Section;
  updateSection?: Maybe<Section>;
};


export type MutationAddContactArgs = {
  input: Scalars['String'];
  typeId: Scalars['Int'];
};


export type MutationAddProfileImageArgs = {
  imageUrl: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  description: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};


export type MutationCreateSectionArgs = {
  items: Array<Scalars['String']>;
  typeId: Scalars['Int'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSectionArgs = {
  id: Scalars['Int'];
};


export type MutationEditGroupArgs = {
  description: Scalars['String'];
  groupId: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  passwordUpdated: Scalars['Boolean'];
  url: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetS3SignedUrlArgs = {
  filename: Scalars['String'];
  filetype: Scalars['String'];
  folder: Scalars['String'];
};


export type MutationJoinGroupArgs = {
  groupId: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
};


export type MutationLeaveGroupArgs = {
  groupId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UserRegistrationInput;
};


export type MutationSetupProfileArgs = {
  input: UserProfileSetupInput;
};


export type MutationSubmitFeedbackArgs = {
  feedback: Scalars['String'];
};


export type MutationUpdateRankArgs = {
  id: Scalars['Int'];
  movingUp: Scalars['Boolean'];
  ranks: Array<Scalars['String']>;
};


export type MutationUpdateSectionArgs = {
  id: Scalars['Int'];
  items: Array<Scalars['String']>;
};

export type PaginatedSections = {
  __typename?: 'PaginatedSections';
  isEnd: Scalars['Boolean'];
  sections: Array<Section>;
};

export type Query = {
  __typename?: 'Query';
  cities: Array<City>;
  contactTypes: Array<ContactType>;
  countries: Array<Country>;
  getCitiesFromState: Array<City>;
  getCityFromName: City;
  getCountry: Country;
  getCountryFromName: Country;
  getDistinctSectionTypes: Array<SectionType>;
  getGroupById?: Maybe<Group>;
  getGroupByName?: Maybe<Group>;
  getGroupByUrl?: Maybe<Group>;
  getGroupMembers?: Maybe<Array<User>>;
  getSection?: Maybe<Section>;
  getSectionType: SectionType;
  getSectionTypes: Array<SectionType>;
  getSectionsByUser: PaginatedSections;
  getStateFromName: State;
  getStatesFromCountry: Array<State>;
  getUser?: Maybe<User>;
  getUsersGroups?: Maybe<Array<Group>>;
  groupHasPassword: Scalars['Boolean'];
  me?: Maybe<User>;
  sections: PaginatedSections;
  states: Array<State>;
  userContacts: Array<UserContact>;
  users: Array<User>;
  validateGroupPassword: GroupResponse;
};


export type QueryGetCitiesFromStateArgs = {
  stateId: Scalars['Int'];
};


export type QueryGetCityFromNameArgs = {
  cityName: Scalars['String'];
  countryId: Scalars['Int'];
};


export type QueryGetCountryArgs = {
  countryId: Scalars['Int'];
};


export type QueryGetCountryFromNameArgs = {
  countryName: Scalars['String'];
};


export type QueryGetGroupByIdArgs = {
  groupId: Scalars['Int'];
};


export type QueryGetGroupByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetGroupByUrlArgs = {
  url: Scalars['String'];
};


export type QueryGetGroupMembersArgs = {
  groupId: Scalars['Int'];
};


export type QueryGetSectionArgs = {
  sectionId: Scalars['Int'];
};


export type QueryGetSectionTypeArgs = {
  sectionTypeId: Scalars['Int'];
};


export type QueryGetSectionsByUserArgs = {
  postCount: Scalars['Int'];
  userId: Scalars['Int'];
};


export type QueryGetStateFromNameArgs = {
  countryId: Scalars['Int'];
  stateName: Scalars['String'];
};


export type QueryGetStatesFromCountryArgs = {
  countryId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryGroupHasPasswordArgs = {
  groupId: Scalars['Int'];
};


export type QuerySectionsArgs = {
  cursor?: Maybe<Scalars['String']>;
  postCount: Scalars['Int'];
};


export type QueryUserContactsArgs = {
  userId: Scalars['Int'];
};


export type QueryValidateGroupPasswordArgs = {
  groupId: Scalars['Int'];
  password: Scalars['String'];
};

export type S3Response = {
  __typename?: 'S3Response';
  signedRequest?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Section = {
  __typename?: 'Section';
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  items?: Maybe<Array<Scalars['String']>>;
  rank: Scalars['String'];
  type: SectionType;
  typeId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type SectionResponse = {
  __typename?: 'SectionResponse';
  errors?: Maybe<Array<FieldError>>;
  section?: Maybe<Section>;
};

export type SectionType = {
  __typename?: 'SectionType';
  createdAt: Scalars['String'];
  creationDate: Scalars['String'];
  hidden: Scalars['Boolean'];
  id: Scalars['Float'];
  inputType: Scalars['String'];
  itemNames: Scalars['String'];
  maxItems: Scalars['Float'];
  name: Scalars['String'];
  tagline: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type State = {
  __typename?: 'State';
  countryCode: Scalars['String'];
  countryId: Scalars['Float'];
  createdAt: Scalars['String'];
  fipsCode: Scalars['String'];
  flag: Scalars['Float'];
  id: Scalars['Float'];
  iso2: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  wikiDataId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  birthday?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  homeTown?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  lastName?: Maybe<Scalars['String']>;
  namePronunciation?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  profileImageUrl?: Maybe<Scalars['String']>;
  profileSetup: Scalars['Boolean'];
  pronouns?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserContact = {
  __typename?: 'UserContact';
  contactType: ContactType;
  contactTypeId: Scalars['Float'];
  id: Scalars['Float'];
  input: Scalars['String'];
  userId: Scalars['Float'];
};

export type UserContactResponse = {
  __typename?: 'UserContactResponse';
  errors?: Maybe<Array<FieldError>>;
  userContact?: Maybe<UserContact>;
};

export type UserProfileSetupInput = {
  birthday?: Maybe<Scalars['DateTime']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  homeTown?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  namePronunciation?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  pronouns?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
};

export type UserRegistrationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CityFragment = (
  { __typename?: 'City' }
  & Pick<City, 'id' | 'name' | 'stateId' | 'stateCode' | 'countryId' | 'countryCode' | 'latitude' | 'longitude' | 'createdAt' | 'updatedAt' | 'flag' | 'wikiDataId'>
);

export type ContactTypeFragment = (
  { __typename?: 'ContactType' }
  & Pick<ContactType, 'id' | 'name' | 'icon' | 'url' | 'profileUrlTemplate' | 'color1' | 'color2' | 'placeholder' | 'socialMedia' | 'createdAt' | 'updatedAt'>
);

export type CountryFragment = (
  { __typename?: 'Country' }
  & Pick<Country, 'id' | 'name' | 'iso3' | 'iso2' | 'phonecode' | 'capital' | 'currency' | 'currencySymbol' | 'tld' | 'native' | 'region' | 'subregion' | 'timezones' | 'translations' | 'latitude' | 'longitude' | 'emoji' | 'emojiU' | 'createdAt' | 'updatedAt' | 'flag' | 'wikiDataId'>
);

export type ErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type GroupFragment = (
  { __typename?: 'Group' }
  & Pick<Group, 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'groupImageUrl' | 'creatorId' | 'url' | 'memberCount'>
);

export type GroupResponseFragment = (
  { __typename?: 'GroupResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragment
  )>>, group?: Maybe<(
    { __typename?: 'Group' }
    & GroupFragment
  )> }
);

export type SectionSnippetFragment = (
  { __typename?: 'Section' }
  & Pick<Section, 'id' | 'createdAt' | 'updatedAt' | 'typeId' | 'items' | 'rank' | 'creatorId'>
  & { creator: (
    { __typename?: 'User' }
    & UserFragment
  ), type: (
    { __typename?: 'SectionType' }
    & SectionTypeSnippetFragment
  ) }
);

export type SectionTypeSnippetFragment = (
  { __typename?: 'SectionType' }
  & Pick<SectionType, 'id' | 'name' | 'type' | 'itemNames' | 'tagline' | 'inputType' | 'maxItems' | 'createdAt' | 'updatedAt' | 'hidden' | 'creationDate'>
);

export type StateFragment = (
  { __typename?: 'State' }
  & Pick<State, 'id' | 'name' | 'countryId' | 'countryCode' | 'fipsCode' | 'iso2' | 'latitude' | 'longitude' | 'createdAt' | 'updatedAt' | 'flag' | 'wikiDataId'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'city' | 'state' | 'country' | 'profileSetup' | 'tagline' | 'pronouns' | 'homeTown' | 'birthday' | 'nickname' | 'namePronunciation' | 'phoneNumber' | 'email' | 'profileImageUrl'>
);

export type UserContactFragment = (
  { __typename?: 'UserContact' }
  & Pick<UserContact, 'id' | 'userId' | 'contactTypeId' | 'input'>
);

export type UserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type AddContactMutationVariables = Exact<{
  typeId: Scalars['Int'];
  input: Scalars['String'];
}>;


export type AddContactMutation = (
  { __typename?: 'Mutation' }
  & { addContact: (
    { __typename?: 'UserContactResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, userContact?: Maybe<(
      { __typename?: 'UserContact' }
      & UserContactFragment
    )> }
  ) }
);

export type AddProfileImageMutationVariables = Exact<{
  imageUrl: Scalars['String'];
}>;


export type AddProfileImageMutation = (
  { __typename?: 'Mutation' }
  & { addProfileImage: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'GroupResponse' }
    & GroupResponseFragment
  ) }
);

export type CreateSectionMutationVariables = Exact<{
  typeId: Scalars['Int'];
  items: Array<Scalars['String']>;
}>;


export type CreateSectionMutation = (
  { __typename?: 'Mutation' }
  & { createSection: (
    { __typename?: 'SectionResponse' }
    & { section?: Maybe<(
      { __typename?: 'Section' }
      & SectionSnippetFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGroup'>
);

export type DeleteSectionMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSectionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSection'>
);

export type EditGroupMutationVariables = Exact<{
  name: Scalars['String'];
  groupId: Scalars['Int'];
  description: Scalars['String'];
  url: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  passwordUpdated: Scalars['Boolean'];
}>;


export type EditGroupMutation = (
  { __typename?: 'Mutation' }
  & { editGroup: (
    { __typename?: 'GroupResponse' }
    & GroupResponseFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GetS3SignedUrlMutationVariables = Exact<{
  filename: Scalars['String'];
  folder: Scalars['String'];
  filetype: Scalars['String'];
}>;


export type GetS3SignedUrlMutation = (
  { __typename?: 'Mutation' }
  & { getS3SignedUrl: (
    { __typename?: 'S3Response' }
    & Pick<S3Response, 'signedRequest' | 'url'>
  ) }
);

export type JoinGroupMutationVariables = Exact<{
  groupId: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
}>;


export type JoinGroupMutation = (
  { __typename?: 'Mutation' }
  & { joinGroup: (
    { __typename?: 'GroupResponse' }
    & GroupResponseFragment
  ) }
);

export type LeaveGroupMutationVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type LeaveGroupMutation = (
  { __typename?: 'Mutation' }
  & { leaveGroup: (
    { __typename?: 'GroupResponse' }
    & { group?: Maybe<(
      { __typename?: 'Group' }
      & GroupFragment
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: UserRegistrationInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragment
  ) }
);

export type SetupProfileMutationVariables = Exact<{
  input: UserProfileSetupInput;
}>;


export type SetupProfileMutation = (
  { __typename?: 'Mutation' }
  & { setupProfile?: Maybe<(
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  )> }
);

export type SubmitFeedbackMutationVariables = Exact<{
  feedback: Scalars['String'];
}>;


export type SubmitFeedbackMutation = (
  { __typename?: 'Mutation' }
  & { submitFeedback: (
    { __typename?: 'FeedbackResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, feedback?: Maybe<(
      { __typename?: 'Feedback' }
      & Pick<Feedback, 'id' | 'feedback' | 'userId'>
    )> }
  ) }
);

export type UpdateSectionMutationVariables = Exact<{
  id: Scalars['Int'];
  items: Array<Scalars['String']>;
}>;


export type UpdateSectionMutation = (
  { __typename?: 'Mutation' }
  & { updateSection?: Maybe<(
    { __typename?: 'Section' }
    & SectionSnippetFragment
  )> }
);

export type UpdateSectionRankMutationVariables = Exact<{
  ranks: Array<Scalars['String']>;
  id: Scalars['Int'];
  movingUp: Scalars['Boolean'];
}>;


export type UpdateSectionRankMutation = (
  { __typename?: 'Mutation' }
  & { updateRank: (
    { __typename?: 'Section' }
    & Pick<Section, 'id' | 'items'>
  ) }
);

export type ContactTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactTypesQuery = (
  { __typename?: 'Query' }
  & { contactTypes: Array<(
    { __typename?: 'ContactType' }
    & ContactTypeFragment
  )> }
);

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Array<(
    { __typename?: 'Country' }
    & Pick<Country, 'name' | 'id' | 'emoji'>
  )> }
);

export type GetCitiesFromStateQueryVariables = Exact<{
  stateId: Scalars['Int'];
}>;


export type GetCitiesFromStateQuery = (
  { __typename?: 'Query' }
  & { getCitiesFromState: Array<(
    { __typename?: 'City' }
    & Pick<City, 'name' | 'id' | 'stateId'>
  )> }
);

export type GetCityFromNameQueryVariables = Exact<{
  cityName: Scalars['String'];
  countryId: Scalars['Int'];
}>;


export type GetCityFromNameQuery = (
  { __typename?: 'Query' }
  & { getCityFromName: (
    { __typename?: 'City' }
    & CityFragment
  ) }
);

export type GetCountryQueryVariables = Exact<{
  countryId: Scalars['Int'];
}>;


export type GetCountryQuery = (
  { __typename?: 'Query' }
  & { getCountry: (
    { __typename?: 'Country' }
    & CountryFragment
  ) }
);

export type GetCountryFromNameQueryVariables = Exact<{
  countryName: Scalars['String'];
}>;


export type GetCountryFromNameQuery = (
  { __typename?: 'Query' }
  & { getCountryFromName: (
    { __typename?: 'Country' }
    & CountryFragment
  ) }
);

export type GetDistinctSectionTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDistinctSectionTypesQuery = (
  { __typename?: 'Query' }
  & { getDistinctSectionTypes: Array<(
    { __typename?: 'SectionType' }
    & Pick<SectionType, 'type'>
  )> }
);

export type GetGroupByIdQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetGroupByIdQuery = (
  { __typename?: 'Query' }
  & { getGroupById?: Maybe<(
    { __typename?: 'Group' }
    & GroupFragment
  )> }
);

export type GetGroupByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetGroupByNameQuery = (
  { __typename?: 'Query' }
  & { getGroupByName?: Maybe<(
    { __typename?: 'Group' }
    & GroupFragment
  )> }
);

export type GetGroupByUrlQueryVariables = Exact<{
  url: Scalars['String'];
}>;


export type GetGroupByUrlQuery = (
  { __typename?: 'Query' }
  & { getGroupByUrl?: Maybe<(
    { __typename?: 'Group' }
    & GroupFragment
  )> }
);

export type GetGroupMembersQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetGroupMembersQuery = (
  { __typename?: 'Query' }
  & { getGroupMembers?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFragment
  )>> }
);

export type GetSectionQueryVariables = Exact<{
  sectionId: Scalars['Int'];
}>;


export type GetSectionQuery = (
  { __typename?: 'Query' }
  & { getSection?: Maybe<(
    { __typename?: 'Section' }
    & SectionSnippetFragment
  )> }
);

export type GetSectionTypeQueryVariables = Exact<{
  sectionTypeId: Scalars['Int'];
}>;


export type GetSectionTypeQuery = (
  { __typename?: 'Query' }
  & { getSectionType: (
    { __typename?: 'SectionType' }
    & SectionTypeSnippetFragment
  ) }
);

export type GetSectionTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSectionTypesQuery = (
  { __typename?: 'Query' }
  & { getSectionTypes: Array<(
    { __typename?: 'SectionType' }
    & SectionTypeSnippetFragment
  )> }
);

export type GetSectionsByUserQueryVariables = Exact<{
  postCount: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type GetSectionsByUserQuery = (
  { __typename?: 'Query' }
  & { getSectionsByUser: (
    { __typename?: 'PaginatedSections' }
    & Pick<PaginatedSections, 'isEnd'>
    & { sections: Array<(
      { __typename?: 'Section' }
      & SectionSnippetFragment
    )> }
  ) }
);

export type GetStateFromNameQueryVariables = Exact<{
  stateName: Scalars['String'];
  countryId: Scalars['Int'];
}>;


export type GetStateFromNameQuery = (
  { __typename?: 'Query' }
  & { getStateFromName: (
    { __typename?: 'State' }
    & StateFragment
  ) }
);

export type GetStatesFromCountryQueryVariables = Exact<{
  countryId: Scalars['Int'];
}>;


export type GetStatesFromCountryQuery = (
  { __typename?: 'Query' }
  & { getStatesFromCountry: Array<(
    { __typename?: 'State' }
    & Pick<State, 'name' | 'id'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type GetUsersGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersGroupsQuery = (
  { __typename?: 'Query' }
  & { getUsersGroups?: Maybe<Array<(
    { __typename?: 'Group' }
    & GroupFragment
  )>> }
);

export type GroupHasPasswordQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GroupHasPasswordQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'groupHasPassword'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type SectionsQueryVariables = Exact<{
  postCount: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type SectionsQuery = (
  { __typename?: 'Query' }
  & { sections: (
    { __typename?: 'PaginatedSections' }
    & Pick<PaginatedSections, 'isEnd'>
    & { sections: Array<(
      { __typename?: 'Section' }
      & SectionSnippetFragment
    )> }
  ) }
);

export type UserContactsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserContactsQuery = (
  { __typename?: 'Query' }
  & { userContacts: Array<(
    { __typename?: 'UserContact' }
    & { contactType: (
      { __typename?: 'ContactType' }
      & ContactTypeFragment
    ) }
    & UserContactFragment
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type ValidateGroupPasswordQueryVariables = Exact<{
  groupId: Scalars['Int'];
  password: Scalars['String'];
}>;


export type ValidateGroupPasswordQuery = (
  { __typename?: 'Query' }
  & { validateGroupPassword: (
    { __typename?: 'GroupResponse' }
    & GroupResponseFragment
  ) }
);

export const CityFragmentDoc = gql`
    fragment City on City {
  id
  name
  stateId
  stateCode
  countryId
  countryCode
  latitude
  longitude
  createdAt
  updatedAt
  flag
  wikiDataId
}
    `;
export const ContactTypeFragmentDoc = gql`
    fragment ContactType on ContactType {
  id
  name
  icon
  url
  profileUrlTemplate
  color1
  color2
  placeholder
  socialMedia
  createdAt
  updatedAt
}
    `;
export const CountryFragmentDoc = gql`
    fragment Country on Country {
  id
  name
  iso3
  iso2
  phonecode
  capital
  currency
  currencySymbol
  tld
  native
  region
  subregion
  timezones
  translations
  latitude
  longitude
  emoji
  emojiU
  createdAt
  updatedAt
  flag
  wikiDataId
}
    `;
export const ErrorFragmentDoc = gql`
    fragment Error on FieldError {
  field
  message
}
    `;
export const GroupFragmentDoc = gql`
    fragment Group on Group {
  id
  name
  description
  createdAt
  updatedAt
  groupImageUrl
  creatorId
  url
  memberCount
}
    `;
export const GroupResponseFragmentDoc = gql`
    fragment GroupResponse on GroupResponse {
  errors {
    ...Error
  }
  group {
    ...Group
  }
}
    ${ErrorFragmentDoc}
${GroupFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
  createdAt
  updatedAt
  firstName
  lastName
  city
  state
  country
  profileSetup
  tagline
  pronouns
  homeTown
  birthday
  nickname
  namePronunciation
  phoneNumber
  email
  profileImageUrl
}
    `;
export const SectionTypeSnippetFragmentDoc = gql`
    fragment SectionTypeSnippet on SectionType {
  id
  name
  type
  itemNames
  tagline
  inputType
  maxItems
  createdAt
  updatedAt
  hidden
  creationDate
}
    `;
export const SectionSnippetFragmentDoc = gql`
    fragment SectionSnippet on Section {
  id
  createdAt
  updatedAt
  typeId
  items
  rank
  creatorId
  creator {
    ...User
  }
  type {
    ...SectionTypeSnippet
  }
}
    ${UserFragmentDoc}
${SectionTypeSnippetFragmentDoc}`;
export const StateFragmentDoc = gql`
    fragment State on State {
  id
  name
  countryId
  countryCode
  fipsCode
  iso2
  latitude
  longitude
  createdAt
  updatedAt
  flag
  wikiDataId
}
    `;
export const UserContactFragmentDoc = gql`
    fragment UserContact on UserContact {
  id
  userId
  contactTypeId
  input
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    ...Error
  }
  user {
    ...User
  }
}
    ${ErrorFragmentDoc}
${UserFragmentDoc}`;
export const AddContactDocument = gql`
    mutation AddContact($typeId: Int!, $input: String!) {
  addContact(typeId: $typeId, input: $input) {
    errors {
      ...Error
    }
    userContact {
      ...UserContact
    }
  }
}
    ${ErrorFragmentDoc}
${UserContactFragmentDoc}`;
export type AddContactMutationFn = Apollo.MutationFunction<AddContactMutation, AddContactMutationVariables>;

/**
 * __useAddContactMutation__
 *
 * To run a mutation, you first call `useAddContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContactMutation, { data, loading, error }] = useAddContactMutation({
 *   variables: {
 *      typeId: // value for 'typeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddContactMutation(baseOptions?: Apollo.MutationHookOptions<AddContactMutation, AddContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContactMutation, AddContactMutationVariables>(AddContactDocument, options);
      }
export type AddContactMutationHookResult = ReturnType<typeof useAddContactMutation>;
export type AddContactMutationResult = Apollo.MutationResult<AddContactMutation>;
export type AddContactMutationOptions = Apollo.BaseMutationOptions<AddContactMutation, AddContactMutationVariables>;
export const AddProfileImageDocument = gql`
    mutation AddProfileImage($imageUrl: String!) {
  addProfileImage(imageUrl: $imageUrl) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type AddProfileImageMutationFn = Apollo.MutationFunction<AddProfileImageMutation, AddProfileImageMutationVariables>;

/**
 * __useAddProfileImageMutation__
 *
 * To run a mutation, you first call `useAddProfileImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfileImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfileImageMutation, { data, loading, error }] = useAddProfileImageMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useAddProfileImageMutation(baseOptions?: Apollo.MutationHookOptions<AddProfileImageMutation, AddProfileImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProfileImageMutation, AddProfileImageMutationVariables>(AddProfileImageDocument, options);
      }
export type AddProfileImageMutationHookResult = ReturnType<typeof useAddProfileImageMutation>;
export type AddProfileImageMutationResult = Apollo.MutationResult<AddProfileImageMutation>;
export type AddProfileImageMutationOptions = Apollo.BaseMutationOptions<AddProfileImageMutation, AddProfileImageMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($name: String!, $description: String!, $url: String!, $imageUrl: String, $password: String) {
  createGroup(
    name: $name
    description: $description
    url: $url
    imageUrl: $imageUrl
    password: $password
  ) {
    ...GroupResponse
  }
}
    ${GroupResponseFragmentDoc}`;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      url: // value for 'url'
 *      imageUrl: // value for 'imageUrl'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateSectionDocument = gql`
    mutation CreateSection($typeId: Int!, $items: [String!]!) {
  createSection(typeId: $typeId, items: $items) {
    section {
      ...SectionSnippet
    }
    errors {
      field
      message
    }
  }
}
    ${SectionSnippetFragmentDoc}`;
export type CreateSectionMutationFn = Apollo.MutationFunction<CreateSectionMutation, CreateSectionMutationVariables>;

/**
 * __useCreateSectionMutation__
 *
 * To run a mutation, you first call `useCreateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSectionMutation, { data, loading, error }] = useCreateSectionMutation({
 *   variables: {
 *      typeId: // value for 'typeId'
 *      items: // value for 'items'
 *   },
 * });
 */
export function useCreateSectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSectionMutation, CreateSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSectionMutation, CreateSectionMutationVariables>(CreateSectionDocument, options);
      }
export type CreateSectionMutationHookResult = ReturnType<typeof useCreateSectionMutation>;
export type CreateSectionMutationResult = Apollo.MutationResult<CreateSectionMutation>;
export type CreateSectionMutationOptions = Apollo.BaseMutationOptions<CreateSectionMutation, CreateSectionMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: Int!) {
  deleteGroup(id: $id)
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const DeleteSectionDocument = gql`
    mutation DeleteSection($id: Int!) {
  deleteSection(id: $id)
}
    `;
export type DeleteSectionMutationFn = Apollo.MutationFunction<DeleteSectionMutation, DeleteSectionMutationVariables>;

/**
 * __useDeleteSectionMutation__
 *
 * To run a mutation, you first call `useDeleteSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSectionMutation, { data, loading, error }] = useDeleteSectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSectionMutation, DeleteSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSectionMutation, DeleteSectionMutationVariables>(DeleteSectionDocument, options);
      }
export type DeleteSectionMutationHookResult = ReturnType<typeof useDeleteSectionMutation>;
export type DeleteSectionMutationResult = Apollo.MutationResult<DeleteSectionMutation>;
export type DeleteSectionMutationOptions = Apollo.BaseMutationOptions<DeleteSectionMutation, DeleteSectionMutationVariables>;
export const EditGroupDocument = gql`
    mutation EditGroup($name: String!, $groupId: Int!, $description: String!, $url: String!, $imageUrl: String, $password: String, $passwordUpdated: Boolean!) {
  editGroup(
    name: $name
    groupId: $groupId
    description: $description
    url: $url
    imageUrl: $imageUrl
    password: $password
    passwordUpdated: $passwordUpdated
  ) {
    ...GroupResponse
  }
}
    ${GroupResponseFragmentDoc}`;
export type EditGroupMutationFn = Apollo.MutationFunction<EditGroupMutation, EditGroupMutationVariables>;

/**
 * __useEditGroupMutation__
 *
 * To run a mutation, you first call `useEditGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editGroupMutation, { data, loading, error }] = useEditGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      groupId: // value for 'groupId'
 *      description: // value for 'description'
 *      url: // value for 'url'
 *      imageUrl: // value for 'imageUrl'
 *      password: // value for 'password'
 *      passwordUpdated: // value for 'passwordUpdated'
 *   },
 * });
 */
export function useEditGroupMutation(baseOptions?: Apollo.MutationHookOptions<EditGroupMutation, EditGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditGroupMutation, EditGroupMutationVariables>(EditGroupDocument, options);
      }
export type EditGroupMutationHookResult = ReturnType<typeof useEditGroupMutation>;
export type EditGroupMutationResult = Apollo.MutationResult<EditGroupMutation>;
export type EditGroupMutationOptions = Apollo.BaseMutationOptions<EditGroupMutation, EditGroupMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetS3SignedUrlDocument = gql`
    mutation GetS3SignedUrl($filename: String!, $folder: String!, $filetype: String!) {
  getS3SignedUrl(filename: $filename, folder: $folder, filetype: $filetype) {
    signedRequest
    url
  }
}
    `;
export type GetS3SignedUrlMutationFn = Apollo.MutationFunction<GetS3SignedUrlMutation, GetS3SignedUrlMutationVariables>;

/**
 * __useGetS3SignedUrlMutation__
 *
 * To run a mutation, you first call `useGetS3SignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetS3SignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getS3SignedUrlMutation, { data, loading, error }] = useGetS3SignedUrlMutation({
 *   variables: {
 *      filename: // value for 'filename'
 *      folder: // value for 'folder'
 *      filetype: // value for 'filetype'
 *   },
 * });
 */
export function useGetS3SignedUrlMutation(baseOptions?: Apollo.MutationHookOptions<GetS3SignedUrlMutation, GetS3SignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetS3SignedUrlMutation, GetS3SignedUrlMutationVariables>(GetS3SignedUrlDocument, options);
      }
export type GetS3SignedUrlMutationHookResult = ReturnType<typeof useGetS3SignedUrlMutation>;
export type GetS3SignedUrlMutationResult = Apollo.MutationResult<GetS3SignedUrlMutation>;
export type GetS3SignedUrlMutationOptions = Apollo.BaseMutationOptions<GetS3SignedUrlMutation, GetS3SignedUrlMutationVariables>;
export const JoinGroupDocument = gql`
    mutation JoinGroup($groupId: Int!, $password: String) {
  joinGroup(groupId: $groupId, password: $password) {
    ...GroupResponse
  }
}
    ${GroupResponseFragmentDoc}`;
export type JoinGroupMutationFn = Apollo.MutationFunction<JoinGroupMutation, JoinGroupMutationVariables>;

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMutation, { data, loading, error }] = useJoinGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useJoinGroupMutation(baseOptions?: Apollo.MutationHookOptions<JoinGroupMutation, JoinGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, options);
      }
export type JoinGroupMutationHookResult = ReturnType<typeof useJoinGroupMutation>;
export type JoinGroupMutationResult = Apollo.MutationResult<JoinGroupMutation>;
export type JoinGroupMutationOptions = Apollo.BaseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>;
export const LeaveGroupDocument = gql`
    mutation LeaveGroup($groupId: Int!) {
  leaveGroup(groupId: $groupId) {
    group {
      ...Group
    }
  }
}
    ${GroupFragmentDoc}`;
export type LeaveGroupMutationFn = Apollo.MutationFunction<LeaveGroupMutation, LeaveGroupMutationVariables>;

/**
 * __useLeaveGroupMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMutation, { data, loading, error }] = useLeaveGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useLeaveGroupMutation(baseOptions?: Apollo.MutationHookOptions<LeaveGroupMutation, LeaveGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument, options);
      }
export type LeaveGroupMutationHookResult = ReturnType<typeof useLeaveGroupMutation>;
export type LeaveGroupMutationResult = Apollo.MutationResult<LeaveGroupMutation>;
export type LeaveGroupMutationOptions = Apollo.BaseMutationOptions<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: UserRegistrationInput!) {
  register(input: $input) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetupProfileDocument = gql`
    mutation SetupProfile($input: UserProfileSetupInput!) {
  setupProfile(input: $input) {
    user {
      ...User
    }
    errors {
      field
      message
    }
  }
}
    ${UserFragmentDoc}`;
export type SetupProfileMutationFn = Apollo.MutationFunction<SetupProfileMutation, SetupProfileMutationVariables>;

/**
 * __useSetupProfileMutation__
 *
 * To run a mutation, you first call `useSetupProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupProfileMutation, { data, loading, error }] = useSetupProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetupProfileMutation(baseOptions?: Apollo.MutationHookOptions<SetupProfileMutation, SetupProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetupProfileMutation, SetupProfileMutationVariables>(SetupProfileDocument, options);
      }
export type SetupProfileMutationHookResult = ReturnType<typeof useSetupProfileMutation>;
export type SetupProfileMutationResult = Apollo.MutationResult<SetupProfileMutation>;
export type SetupProfileMutationOptions = Apollo.BaseMutationOptions<SetupProfileMutation, SetupProfileMutationVariables>;
export const SubmitFeedbackDocument = gql`
    mutation SubmitFeedback($feedback: String!) {
  submitFeedback(feedback: $feedback) {
    errors {
      field
      message
    }
    feedback {
      id
      feedback
      userId
    }
  }
}
    `;
export type SubmitFeedbackMutationFn = Apollo.MutationFunction<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>;

/**
 * __useSubmitFeedbackMutation__
 *
 * To run a mutation, you first call `useSubmitFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitFeedbackMutation, { data, loading, error }] = useSubmitFeedbackMutation({
 *   variables: {
 *      feedback: // value for 'feedback'
 *   },
 * });
 */
export function useSubmitFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>(SubmitFeedbackDocument, options);
      }
export type SubmitFeedbackMutationHookResult = ReturnType<typeof useSubmitFeedbackMutation>;
export type SubmitFeedbackMutationResult = Apollo.MutationResult<SubmitFeedbackMutation>;
export type SubmitFeedbackMutationOptions = Apollo.BaseMutationOptions<SubmitFeedbackMutation, SubmitFeedbackMutationVariables>;
export const UpdateSectionDocument = gql`
    mutation UpdateSection($id: Int!, $items: [String!]!) {
  updateSection(id: $id, items: $items) {
    ...SectionSnippet
  }
}
    ${SectionSnippetFragmentDoc}`;
export type UpdateSectionMutationFn = Apollo.MutationFunction<UpdateSectionMutation, UpdateSectionMutationVariables>;

/**
 * __useUpdateSectionMutation__
 *
 * To run a mutation, you first call `useUpdateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSectionMutation, { data, loading, error }] = useUpdateSectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      items: // value for 'items'
 *   },
 * });
 */
export function useUpdateSectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSectionMutation, UpdateSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSectionMutation, UpdateSectionMutationVariables>(UpdateSectionDocument, options);
      }
export type UpdateSectionMutationHookResult = ReturnType<typeof useUpdateSectionMutation>;
export type UpdateSectionMutationResult = Apollo.MutationResult<UpdateSectionMutation>;
export type UpdateSectionMutationOptions = Apollo.BaseMutationOptions<UpdateSectionMutation, UpdateSectionMutationVariables>;
export const UpdateSectionRankDocument = gql`
    mutation UpdateSectionRank($ranks: [String!]!, $id: Int!, $movingUp: Boolean!) {
  updateRank(ranks: $ranks, id: $id, movingUp: $movingUp) {
    id
    items
  }
}
    `;
export type UpdateSectionRankMutationFn = Apollo.MutationFunction<UpdateSectionRankMutation, UpdateSectionRankMutationVariables>;

/**
 * __useUpdateSectionRankMutation__
 *
 * To run a mutation, you first call `useUpdateSectionRankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSectionRankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSectionRankMutation, { data, loading, error }] = useUpdateSectionRankMutation({
 *   variables: {
 *      ranks: // value for 'ranks'
 *      id: // value for 'id'
 *      movingUp: // value for 'movingUp'
 *   },
 * });
 */
export function useUpdateSectionRankMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSectionRankMutation, UpdateSectionRankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSectionRankMutation, UpdateSectionRankMutationVariables>(UpdateSectionRankDocument, options);
      }
export type UpdateSectionRankMutationHookResult = ReturnType<typeof useUpdateSectionRankMutation>;
export type UpdateSectionRankMutationResult = Apollo.MutationResult<UpdateSectionRankMutation>;
export type UpdateSectionRankMutationOptions = Apollo.BaseMutationOptions<UpdateSectionRankMutation, UpdateSectionRankMutationVariables>;
export const ContactTypesDocument = gql`
    query ContactTypes {
  contactTypes {
    ...ContactType
  }
}
    ${ContactTypeFragmentDoc}`;

/**
 * __useContactTypesQuery__
 *
 * To run a query within a React component, call `useContactTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useContactTypesQuery(baseOptions?: Apollo.QueryHookOptions<ContactTypesQuery, ContactTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactTypesQuery, ContactTypesQueryVariables>(ContactTypesDocument, options);
      }
export function useContactTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactTypesQuery, ContactTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactTypesQuery, ContactTypesQueryVariables>(ContactTypesDocument, options);
        }
export type ContactTypesQueryHookResult = ReturnType<typeof useContactTypesQuery>;
export type ContactTypesLazyQueryHookResult = ReturnType<typeof useContactTypesLazyQuery>;
export type ContactTypesQueryResult = Apollo.QueryResult<ContactTypesQuery, ContactTypesQueryVariables>;
export const CountriesDocument = gql`
    query Countries {
  countries {
    name
    id
    emoji
  }
}
    `;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;
export const GetCitiesFromStateDocument = gql`
    query GetCitiesFromState($stateId: Int!) {
  getCitiesFromState(stateId: $stateId) {
    name
    id
    stateId
  }
}
    `;

/**
 * __useGetCitiesFromStateQuery__
 *
 * To run a query within a React component, call `useGetCitiesFromStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesFromStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesFromStateQuery({
 *   variables: {
 *      stateId: // value for 'stateId'
 *   },
 * });
 */
export function useGetCitiesFromStateQuery(baseOptions: Apollo.QueryHookOptions<GetCitiesFromStateQuery, GetCitiesFromStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesFromStateQuery, GetCitiesFromStateQueryVariables>(GetCitiesFromStateDocument, options);
      }
export function useGetCitiesFromStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesFromStateQuery, GetCitiesFromStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesFromStateQuery, GetCitiesFromStateQueryVariables>(GetCitiesFromStateDocument, options);
        }
export type GetCitiesFromStateQueryHookResult = ReturnType<typeof useGetCitiesFromStateQuery>;
export type GetCitiesFromStateLazyQueryHookResult = ReturnType<typeof useGetCitiesFromStateLazyQuery>;
export type GetCitiesFromStateQueryResult = Apollo.QueryResult<GetCitiesFromStateQuery, GetCitiesFromStateQueryVariables>;
export const GetCityFromNameDocument = gql`
    query GetCityFromName($cityName: String!, $countryId: Int!) {
  getCityFromName(cityName: $cityName, countryId: $countryId) {
    ...City
  }
}
    ${CityFragmentDoc}`;

/**
 * __useGetCityFromNameQuery__
 *
 * To run a query within a React component, call `useGetCityFromNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityFromNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityFromNameQuery({
 *   variables: {
 *      cityName: // value for 'cityName'
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useGetCityFromNameQuery(baseOptions: Apollo.QueryHookOptions<GetCityFromNameQuery, GetCityFromNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCityFromNameQuery, GetCityFromNameQueryVariables>(GetCityFromNameDocument, options);
      }
export function useGetCityFromNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCityFromNameQuery, GetCityFromNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCityFromNameQuery, GetCityFromNameQueryVariables>(GetCityFromNameDocument, options);
        }
export type GetCityFromNameQueryHookResult = ReturnType<typeof useGetCityFromNameQuery>;
export type GetCityFromNameLazyQueryHookResult = ReturnType<typeof useGetCityFromNameLazyQuery>;
export type GetCityFromNameQueryResult = Apollo.QueryResult<GetCityFromNameQuery, GetCityFromNameQueryVariables>;
export const GetCountryDocument = gql`
    query GetCountry($countryId: Int!) {
  getCountry(countryId: $countryId) {
    ...Country
  }
}
    ${CountryFragmentDoc}`;

/**
 * __useGetCountryQuery__
 *
 * To run a query within a React component, call `useGetCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryQuery({
 *   variables: {
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useGetCountryQuery(baseOptions: Apollo.QueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
      }
export function useGetCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
        }
export type GetCountryQueryHookResult = ReturnType<typeof useGetCountryQuery>;
export type GetCountryLazyQueryHookResult = ReturnType<typeof useGetCountryLazyQuery>;
export type GetCountryQueryResult = Apollo.QueryResult<GetCountryQuery, GetCountryQueryVariables>;
export const GetCountryFromNameDocument = gql`
    query GetCountryFromName($countryName: String!) {
  getCountryFromName(countryName: $countryName) {
    ...Country
  }
}
    ${CountryFragmentDoc}`;

/**
 * __useGetCountryFromNameQuery__
 *
 * To run a query within a React component, call `useGetCountryFromNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryFromNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryFromNameQuery({
 *   variables: {
 *      countryName: // value for 'countryName'
 *   },
 * });
 */
export function useGetCountryFromNameQuery(baseOptions: Apollo.QueryHookOptions<GetCountryFromNameQuery, GetCountryFromNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountryFromNameQuery, GetCountryFromNameQueryVariables>(GetCountryFromNameDocument, options);
      }
export function useGetCountryFromNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountryFromNameQuery, GetCountryFromNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountryFromNameQuery, GetCountryFromNameQueryVariables>(GetCountryFromNameDocument, options);
        }
export type GetCountryFromNameQueryHookResult = ReturnType<typeof useGetCountryFromNameQuery>;
export type GetCountryFromNameLazyQueryHookResult = ReturnType<typeof useGetCountryFromNameLazyQuery>;
export type GetCountryFromNameQueryResult = Apollo.QueryResult<GetCountryFromNameQuery, GetCountryFromNameQueryVariables>;
export const GetDistinctSectionTypesDocument = gql`
    query GetDistinctSectionTypes {
  getDistinctSectionTypes {
    type
  }
}
    `;

/**
 * __useGetDistinctSectionTypesQuery__
 *
 * To run a query within a React component, call `useGetDistinctSectionTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDistinctSectionTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDistinctSectionTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDistinctSectionTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetDistinctSectionTypesQuery, GetDistinctSectionTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDistinctSectionTypesQuery, GetDistinctSectionTypesQueryVariables>(GetDistinctSectionTypesDocument, options);
      }
export function useGetDistinctSectionTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDistinctSectionTypesQuery, GetDistinctSectionTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDistinctSectionTypesQuery, GetDistinctSectionTypesQueryVariables>(GetDistinctSectionTypesDocument, options);
        }
export type GetDistinctSectionTypesQueryHookResult = ReturnType<typeof useGetDistinctSectionTypesQuery>;
export type GetDistinctSectionTypesLazyQueryHookResult = ReturnType<typeof useGetDistinctSectionTypesLazyQuery>;
export type GetDistinctSectionTypesQueryResult = Apollo.QueryResult<GetDistinctSectionTypesQuery, GetDistinctSectionTypesQueryVariables>;
export const GetGroupByIdDocument = gql`
    query GetGroupById($groupId: Int!) {
  getGroupById(groupId: $groupId) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetGroupByIdQuery__
 *
 * To run a query within a React component, call `useGetGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByIdQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetGroupByIdQuery(baseOptions: Apollo.QueryHookOptions<GetGroupByIdQuery, GetGroupByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByIdQuery, GetGroupByIdQueryVariables>(GetGroupByIdDocument, options);
      }
export function useGetGroupByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByIdQuery, GetGroupByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByIdQuery, GetGroupByIdQueryVariables>(GetGroupByIdDocument, options);
        }
export type GetGroupByIdQueryHookResult = ReturnType<typeof useGetGroupByIdQuery>;
export type GetGroupByIdLazyQueryHookResult = ReturnType<typeof useGetGroupByIdLazyQuery>;
export type GetGroupByIdQueryResult = Apollo.QueryResult<GetGroupByIdQuery, GetGroupByIdQueryVariables>;
export const GetGroupByNameDocument = gql`
    query GetGroupByName($name: String!) {
  getGroupByName(name: $name) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetGroupByNameQuery__
 *
 * To run a query within a React component, call `useGetGroupByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetGroupByNameQuery(baseOptions: Apollo.QueryHookOptions<GetGroupByNameQuery, GetGroupByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByNameQuery, GetGroupByNameQueryVariables>(GetGroupByNameDocument, options);
      }
export function useGetGroupByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByNameQuery, GetGroupByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByNameQuery, GetGroupByNameQueryVariables>(GetGroupByNameDocument, options);
        }
export type GetGroupByNameQueryHookResult = ReturnType<typeof useGetGroupByNameQuery>;
export type GetGroupByNameLazyQueryHookResult = ReturnType<typeof useGetGroupByNameLazyQuery>;
export type GetGroupByNameQueryResult = Apollo.QueryResult<GetGroupByNameQuery, GetGroupByNameQueryVariables>;
export const GetGroupByUrlDocument = gql`
    query GetGroupByUrl($url: String!) {
  getGroupByUrl(url: $url) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetGroupByUrlQuery__
 *
 * To run a query within a React component, call `useGetGroupByUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByUrlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetGroupByUrlQuery(baseOptions: Apollo.QueryHookOptions<GetGroupByUrlQuery, GetGroupByUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByUrlQuery, GetGroupByUrlQueryVariables>(GetGroupByUrlDocument, options);
      }
export function useGetGroupByUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByUrlQuery, GetGroupByUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByUrlQuery, GetGroupByUrlQueryVariables>(GetGroupByUrlDocument, options);
        }
export type GetGroupByUrlQueryHookResult = ReturnType<typeof useGetGroupByUrlQuery>;
export type GetGroupByUrlLazyQueryHookResult = ReturnType<typeof useGetGroupByUrlLazyQuery>;
export type GetGroupByUrlQueryResult = Apollo.QueryResult<GetGroupByUrlQuery, GetGroupByUrlQueryVariables>;
export const GetGroupMembersDocument = gql`
    query GetGroupMembers($groupId: Int!) {
  getGroupMembers(groupId: $groupId) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetGroupMembersQuery__
 *
 * To run a query within a React component, call `useGetGroupMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupMembersQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetGroupMembersQuery(baseOptions: Apollo.QueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(GetGroupMembersDocument, options);
      }
export function useGetGroupMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(GetGroupMembersDocument, options);
        }
export type GetGroupMembersQueryHookResult = ReturnType<typeof useGetGroupMembersQuery>;
export type GetGroupMembersLazyQueryHookResult = ReturnType<typeof useGetGroupMembersLazyQuery>;
export type GetGroupMembersQueryResult = Apollo.QueryResult<GetGroupMembersQuery, GetGroupMembersQueryVariables>;
export const GetSectionDocument = gql`
    query GetSection($sectionId: Int!) {
  getSection(sectionId: $sectionId) {
    ...SectionSnippet
  }
}
    ${SectionSnippetFragmentDoc}`;

/**
 * __useGetSectionQuery__
 *
 * To run a query within a React component, call `useGetSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionQuery({
 *   variables: {
 *      sectionId: // value for 'sectionId'
 *   },
 * });
 */
export function useGetSectionQuery(baseOptions: Apollo.QueryHookOptions<GetSectionQuery, GetSectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSectionQuery, GetSectionQueryVariables>(GetSectionDocument, options);
      }
export function useGetSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionQuery, GetSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSectionQuery, GetSectionQueryVariables>(GetSectionDocument, options);
        }
export type GetSectionQueryHookResult = ReturnType<typeof useGetSectionQuery>;
export type GetSectionLazyQueryHookResult = ReturnType<typeof useGetSectionLazyQuery>;
export type GetSectionQueryResult = Apollo.QueryResult<GetSectionQuery, GetSectionQueryVariables>;
export const GetSectionTypeDocument = gql`
    query GetSectionType($sectionTypeId: Int!) {
  getSectionType(sectionTypeId: $sectionTypeId) {
    ...SectionTypeSnippet
  }
}
    ${SectionTypeSnippetFragmentDoc}`;

/**
 * __useGetSectionTypeQuery__
 *
 * To run a query within a React component, call `useGetSectionTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionTypeQuery({
 *   variables: {
 *      sectionTypeId: // value for 'sectionTypeId'
 *   },
 * });
 */
export function useGetSectionTypeQuery(baseOptions: Apollo.QueryHookOptions<GetSectionTypeQuery, GetSectionTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSectionTypeQuery, GetSectionTypeQueryVariables>(GetSectionTypeDocument, options);
      }
export function useGetSectionTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionTypeQuery, GetSectionTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSectionTypeQuery, GetSectionTypeQueryVariables>(GetSectionTypeDocument, options);
        }
export type GetSectionTypeQueryHookResult = ReturnType<typeof useGetSectionTypeQuery>;
export type GetSectionTypeLazyQueryHookResult = ReturnType<typeof useGetSectionTypeLazyQuery>;
export type GetSectionTypeQueryResult = Apollo.QueryResult<GetSectionTypeQuery, GetSectionTypeQueryVariables>;
export const GetSectionTypesDocument = gql`
    query getSectionTypes {
  getSectionTypes {
    ...SectionTypeSnippet
  }
}
    ${SectionTypeSnippetFragmentDoc}`;

/**
 * __useGetSectionTypesQuery__
 *
 * To run a query within a React component, call `useGetSectionTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSectionTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetSectionTypesQuery, GetSectionTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSectionTypesQuery, GetSectionTypesQueryVariables>(GetSectionTypesDocument, options);
      }
export function useGetSectionTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionTypesQuery, GetSectionTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSectionTypesQuery, GetSectionTypesQueryVariables>(GetSectionTypesDocument, options);
        }
export type GetSectionTypesQueryHookResult = ReturnType<typeof useGetSectionTypesQuery>;
export type GetSectionTypesLazyQueryHookResult = ReturnType<typeof useGetSectionTypesLazyQuery>;
export type GetSectionTypesQueryResult = Apollo.QueryResult<GetSectionTypesQuery, GetSectionTypesQueryVariables>;
export const GetSectionsByUserDocument = gql`
    query GetSectionsByUser($postCount: Int!, $userId: Int!) {
  getSectionsByUser(postCount: $postCount, userId: $userId) {
    isEnd
    sections {
      ...SectionSnippet
    }
  }
}
    ${SectionSnippetFragmentDoc}`;

/**
 * __useGetSectionsByUserQuery__
 *
 * To run a query within a React component, call `useGetSectionsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionsByUserQuery({
 *   variables: {
 *      postCount: // value for 'postCount'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetSectionsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetSectionsByUserQuery, GetSectionsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSectionsByUserQuery, GetSectionsByUserQueryVariables>(GetSectionsByUserDocument, options);
      }
export function useGetSectionsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionsByUserQuery, GetSectionsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSectionsByUserQuery, GetSectionsByUserQueryVariables>(GetSectionsByUserDocument, options);
        }
export type GetSectionsByUserQueryHookResult = ReturnType<typeof useGetSectionsByUserQuery>;
export type GetSectionsByUserLazyQueryHookResult = ReturnType<typeof useGetSectionsByUserLazyQuery>;
export type GetSectionsByUserQueryResult = Apollo.QueryResult<GetSectionsByUserQuery, GetSectionsByUserQueryVariables>;
export const GetStateFromNameDocument = gql`
    query GetStateFromName($stateName: String!, $countryId: Int!) {
  getStateFromName(stateName: $stateName, countryId: $countryId) {
    ...State
  }
}
    ${StateFragmentDoc}`;

/**
 * __useGetStateFromNameQuery__
 *
 * To run a query within a React component, call `useGetStateFromNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStateFromNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStateFromNameQuery({
 *   variables: {
 *      stateName: // value for 'stateName'
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useGetStateFromNameQuery(baseOptions: Apollo.QueryHookOptions<GetStateFromNameQuery, GetStateFromNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStateFromNameQuery, GetStateFromNameQueryVariables>(GetStateFromNameDocument, options);
      }
export function useGetStateFromNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStateFromNameQuery, GetStateFromNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStateFromNameQuery, GetStateFromNameQueryVariables>(GetStateFromNameDocument, options);
        }
export type GetStateFromNameQueryHookResult = ReturnType<typeof useGetStateFromNameQuery>;
export type GetStateFromNameLazyQueryHookResult = ReturnType<typeof useGetStateFromNameLazyQuery>;
export type GetStateFromNameQueryResult = Apollo.QueryResult<GetStateFromNameQuery, GetStateFromNameQueryVariables>;
export const GetStatesFromCountryDocument = gql`
    query GetStatesFromCountry($countryId: Int!) {
  getStatesFromCountry(countryId: $countryId) {
    name
    id
  }
}
    `;

/**
 * __useGetStatesFromCountryQuery__
 *
 * To run a query within a React component, call `useGetStatesFromCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatesFromCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatesFromCountryQuery({
 *   variables: {
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useGetStatesFromCountryQuery(baseOptions: Apollo.QueryHookOptions<GetStatesFromCountryQuery, GetStatesFromCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatesFromCountryQuery, GetStatesFromCountryQueryVariables>(GetStatesFromCountryDocument, options);
      }
export function useGetStatesFromCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatesFromCountryQuery, GetStatesFromCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatesFromCountryQuery, GetStatesFromCountryQueryVariables>(GetStatesFromCountryDocument, options);
        }
export type GetStatesFromCountryQueryHookResult = ReturnType<typeof useGetStatesFromCountryQuery>;
export type GetStatesFromCountryLazyQueryHookResult = ReturnType<typeof useGetStatesFromCountryLazyQuery>;
export type GetStatesFromCountryQueryResult = Apollo.QueryResult<GetStatesFromCountryQuery, GetStatesFromCountryQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($username: String!) {
  getUser(username: $username) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersGroupsDocument = gql`
    query GetUsersGroups {
  getUsersGroups {
    ...Group
  }
}
    ${GroupFragmentDoc}`;

/**
 * __useGetUsersGroupsQuery__
 *
 * To run a query within a React component, call `useGetUsersGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersGroupsQuery, GetUsersGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersGroupsQuery, GetUsersGroupsQueryVariables>(GetUsersGroupsDocument, options);
      }
export function useGetUsersGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersGroupsQuery, GetUsersGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersGroupsQuery, GetUsersGroupsQueryVariables>(GetUsersGroupsDocument, options);
        }
export type GetUsersGroupsQueryHookResult = ReturnType<typeof useGetUsersGroupsQuery>;
export type GetUsersGroupsLazyQueryHookResult = ReturnType<typeof useGetUsersGroupsLazyQuery>;
export type GetUsersGroupsQueryResult = Apollo.QueryResult<GetUsersGroupsQuery, GetUsersGroupsQueryVariables>;
export const GroupHasPasswordDocument = gql`
    query groupHasPassword($groupId: Int!) {
  groupHasPassword(groupId: $groupId)
}
    `;

/**
 * __useGroupHasPasswordQuery__
 *
 * To run a query within a React component, call `useGroupHasPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupHasPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupHasPasswordQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupHasPasswordQuery(baseOptions: Apollo.QueryHookOptions<GroupHasPasswordQuery, GroupHasPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupHasPasswordQuery, GroupHasPasswordQueryVariables>(GroupHasPasswordDocument, options);
      }
export function useGroupHasPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupHasPasswordQuery, GroupHasPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupHasPasswordQuery, GroupHasPasswordQueryVariables>(GroupHasPasswordDocument, options);
        }
export type GroupHasPasswordQueryHookResult = ReturnType<typeof useGroupHasPasswordQuery>;
export type GroupHasPasswordLazyQueryHookResult = ReturnType<typeof useGroupHasPasswordLazyQuery>;
export type GroupHasPasswordQueryResult = Apollo.QueryResult<GroupHasPasswordQuery, GroupHasPasswordQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SectionsDocument = gql`
    query Sections($postCount: Int!, $cursor: String) {
  sections(postCount: $postCount, cursor: $cursor) {
    isEnd
    sections {
      ...SectionSnippet
    }
  }
}
    ${SectionSnippetFragmentDoc}`;

/**
 * __useSectionsQuery__
 *
 * To run a query within a React component, call `useSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSectionsQuery({
 *   variables: {
 *      postCount: // value for 'postCount'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSectionsQuery(baseOptions: Apollo.QueryHookOptions<SectionsQuery, SectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SectionsQuery, SectionsQueryVariables>(SectionsDocument, options);
      }
export function useSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SectionsQuery, SectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SectionsQuery, SectionsQueryVariables>(SectionsDocument, options);
        }
export type SectionsQueryHookResult = ReturnType<typeof useSectionsQuery>;
export type SectionsLazyQueryHookResult = ReturnType<typeof useSectionsLazyQuery>;
export type SectionsQueryResult = Apollo.QueryResult<SectionsQuery, SectionsQueryVariables>;
export const UserContactsDocument = gql`
    query UserContacts($userId: Int!) {
  userContacts(userId: $userId) {
    contactType {
      ...ContactType
    }
    ...UserContact
  }
}
    ${ContactTypeFragmentDoc}
${UserContactFragmentDoc}`;

/**
 * __useUserContactsQuery__
 *
 * To run a query within a React component, call `useUserContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserContactsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserContactsQuery(baseOptions: Apollo.QueryHookOptions<UserContactsQuery, UserContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserContactsQuery, UserContactsQueryVariables>(UserContactsDocument, options);
      }
export function useUserContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserContactsQuery, UserContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserContactsQuery, UserContactsQueryVariables>(UserContactsDocument, options);
        }
export type UserContactsQueryHookResult = ReturnType<typeof useUserContactsQuery>;
export type UserContactsLazyQueryHookResult = ReturnType<typeof useUserContactsLazyQuery>;
export type UserContactsQueryResult = Apollo.QueryResult<UserContactsQuery, UserContactsQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const ValidateGroupPasswordDocument = gql`
    query ValidateGroupPassword($groupId: Int!, $password: String!) {
  validateGroupPassword(groupId: $groupId, password: $password) {
    ...GroupResponse
  }
}
    ${GroupResponseFragmentDoc}`;

/**
 * __useValidateGroupPasswordQuery__
 *
 * To run a query within a React component, call `useValidateGroupPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateGroupPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateGroupPasswordQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useValidateGroupPasswordQuery(baseOptions: Apollo.QueryHookOptions<ValidateGroupPasswordQuery, ValidateGroupPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateGroupPasswordQuery, ValidateGroupPasswordQueryVariables>(ValidateGroupPasswordDocument, options);
      }
export function useValidateGroupPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateGroupPasswordQuery, ValidateGroupPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateGroupPasswordQuery, ValidateGroupPasswordQueryVariables>(ValidateGroupPasswordDocument, options);
        }
export type ValidateGroupPasswordQueryHookResult = ReturnType<typeof useValidateGroupPasswordQuery>;
export type ValidateGroupPasswordLazyQueryHookResult = ReturnType<typeof useValidateGroupPasswordLazyQuery>;
export type ValidateGroupPasswordQueryResult = Apollo.QueryResult<ValidateGroupPasswordQuery, ValidateGroupPasswordQueryVariables>;
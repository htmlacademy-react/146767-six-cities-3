import {State} from '@/types/state';
import {AuthorizationStatus, NameSpace} from '@/constants';

export const getOfferId = (state: State) => state[NameSpace.User].id;
export const getCurrentCity = (state: State) => state[NameSpace.User].city;
export const getCurrentSorting = (state: State) => state[NameSpace.User].sorting;
export const getIsAuthStatus = (state: State) => state[NameSpace.User].authorizationStatus === String(AuthorizationStatus.Auth);
export const getUserData = (state: State) => state[NameSpace.User].userData;
export const getAddedComment = (state: State) => state[NameSpace.User].addedComment;
export const getLoginStatus = (state: State) => state[NameSpace.User].LoginStatus;
export const getPostCommentStatus = (state: State) => state[NameSpace.User].PostCommentStatus;

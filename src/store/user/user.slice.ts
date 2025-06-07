import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DEFAULT_CITY,
  DEFAULT_SORTING_TYPE,
  NameSpace,
  SortingType,
  AuthorizationStatus,
  RequestStatus,
} from '@/constants';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  postCommentAction,
} from './user.api';
import {UserData} from '@/types/user-data';
import {Comment} from '@/types/offers';

interface InitialStateProps {
  id?: string;
  city: string;
  sorting: SortingType;
  authorizationStatus: string;
  userData: UserData | null;
  addedComment: Comment | null;
  LoginStatus: RequestStatus;
  PostCommentStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  id: undefined,
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING_TYPE,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  addedComment: null,
  LoginStatus: RequestStatus.Idle,
  PostCommentStatus: RequestStatus.Idle,
};

export const userAction = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSorting: (state, action: PayloadAction<SortingType>) => {
      state.sorting = action.payload;
    },
    setOfferId: (state, action: PayloadAction<string | undefined>) => {
      state.id = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.LoginStatus = RequestStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.LoginStatus = RequestStatus.Succeeded;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.LoginStatus = RequestStatus.Failed;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.PostCommentStatus = RequestStatus.Loading;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.addedComment = action.payload;
        state.PostCommentStatus = RequestStatus.Succeeded;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.PostCommentStatus = RequestStatus.Failed;
      });
  }
});

export const {
  setOfferId,
  changeCity,
  changeSorting,
} = userAction.actions;

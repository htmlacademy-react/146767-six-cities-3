import {combineReducers} from '@reduxjs/toolkit';
import {dataLoadAction} from '../load-action/load-action';
import {userAction} from '../user-action/user-action';
import {NameSpace} from '@/constants';

export const rootReducer = combineReducers({
  [NameSpace.Load]: dataLoadAction.reducer,
  [NameSpace.User]: userAction.reducer,
});

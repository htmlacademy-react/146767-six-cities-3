import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DEFAULT_CITY,
  DEFAULT_SORTING_TYPE,
  NameSpace,
  SortingType
} from '@/constants';

interface InitialStateProps {
  id?: string;
  city: string;
  sorting: SortingType;
}

const initialState: InitialStateProps = {
  id: undefined,
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING_TYPE,
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
});

export const {
  setOfferId,
  changeCity,
  changeSorting
} = userAction.actions;

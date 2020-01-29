import { createReducer, updateKey } from '../lib/utils';
import { createStandardAction } from 'typesafe-actions';

const SET_CUSTOM = 'header/SET_CUSTOM';
const SET_USER_LOGO = 'header/SET_USER_LOGO';
const SET_SONGC_USERNAME = 'header/SET_SONGC_USERNAME';
export type UserLogo = {
  title: string | null;
  logo_image: string | null;
};

export interface HeaderState {
  custom: boolean;
  userLogo: null | UserLogo;
  songcUsername: string | null;
}

export const setCustom = createStandardAction(SET_CUSTOM)<boolean>();
export const setUserLogo = createStandardAction(SET_USER_LOGO)<UserLogo>();
export const setSongcUsername = createStandardAction(SET_SONGC_USERNAME)<
  string
>();
type SetCustom = ReturnType<typeof setCustom>;
type SetUserLogo = ReturnType<typeof setUserLogo>;
type SetSongcUsername = ReturnType<typeof setSongcUsername>;

const initialState: HeaderState = {
  custom: false,
  userLogo: null,
  songcUsername: null,
};
const header = createReducer(
  {
    [SET_CUSTOM]: (state, action: SetCustom) => {
      return updateKey(state, 'custom', action.payload);
    },
    [SET_USER_LOGO]: (state, { payload }: SetUserLogo) => {
      return updateKey(state, 'userLogo', payload);
    },
    [SET_SONGC_USERNAME]: (state, { payload }: SetSongcUsername) => {
      return updateKey(state, 'songcUsername', payload);
    },
  },
  initialState,
);

export default header;

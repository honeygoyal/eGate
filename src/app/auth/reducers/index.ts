import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action,
  State,
} from "@ngrx/store";
import { AuthActions } from "../action-types";

export const authFeatureKey = "auth";

export interface AuthState {
  user: any;
}
export const initialAuthState: AuthState = {
  user: undefined,
};

const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
export function reducer(state, action) {
  return authReducer(state, action);
}

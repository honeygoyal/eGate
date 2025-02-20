import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "[Login Page] User Login",
  props<{ user: any }>()
);

export const logout = createAction("[Top Menu] Logout");

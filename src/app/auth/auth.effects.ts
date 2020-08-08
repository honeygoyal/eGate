import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {
    actions$.subscribe((action) => {
      if (action.type == "[Login Page] User Login") {
        localStorage.setItem("user", JSON.stringify(action["user"]));
      }
      if (action.type == "[Top Menu] Logout") {
        localStorage.removeItem("user");
        this.router.navigateByUrl("/login");
      }
    });

    // const login$ = createEffect(
    //   () =>
    //     this.actions$.pipe(
    //       ofType(AuthActions.login),
    //       tap((action) => {
    //         localStorage.setItem("user", JSON.stringify(action.user));
    //       })
    //     ),
    //   { dispatch: false }
    // );

    // const logout$ = createEffect(
    //   () =>
    //     this.actions$.pipe(
    //       ofType(AuthActions.logout),
    //       tap((action) => {
    //         localStorage.removeItem("user");
    //         this.router.navigateByUrl("/login");
    //       })
    //     ),
    //   { dispatch: false }
    // );
  }
}

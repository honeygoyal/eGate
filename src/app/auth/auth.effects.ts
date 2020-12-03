import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(public actions$: Actions, private router: Router) {
    actions$.subscribe((action) => {
      if (action.type == "[Login Page] User Login") {
        localStorage.setItem("user", JSON.stringify(action["user"]));
      }
      if (action.type == "[Top Menu] Logout") {
        localStorage.removeItem("user");
        localStorage.clear()
        this.router.navigateByUrl("/login");
        location.reload()
      }
    });

  }
}

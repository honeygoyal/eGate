import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if (!loggedIn) {
           localStorage.removeItem("user");
        localStorage.clear();
        this.router.navigateByUrl("/login");
        location.reload();
          
        }
      })
    );
  }
}

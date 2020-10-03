import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "./reducers";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { login } from "./auth/auth.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {

  checkForCurrentUrl=location.href.includes('/exampanel');

  ngOnInit(): void {
    const userProfile = localStorage.getItem("user");
   
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(map(isLoggedOut));
  }
  constructor(private store: Store<AppState>, public router: Router) {}
  title = "eGateTutor";
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
}

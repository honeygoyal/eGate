import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { LoginFormModal } from "../../model/loginform.model";
import { AuthService } from "../../service/auth.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { login } from "../../auth.actions";
import { noop } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  LoginData: LoginFormModal;
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  onSubmit() {
    this.LoginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService
      .login(this.LoginData)
      .pipe(
        tap((user) => {
          this.store.dispatch(login({ user }));
          this.router.navigateByUrl("/userdashboard/profile");
        })
      )
      .subscribe(noop);
  }
}

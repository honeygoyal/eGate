import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { LoginFormModal } from "../../model/loginform.model";
import { AuthService } from "../../service/auth.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { login } from "../../auth.actions";

import swal from "sweetalert2";
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
        })
      )
      .subscribe(
        (data) => {
          this.router.navigateByUrl("userdashboard/profile/true");
        },
        (err) => {
          if (err.error.message !== undefined)
            swal.fire("Please check your Credentials");
          else swal.fire("Something went wrong");
        }
      );
  }
}

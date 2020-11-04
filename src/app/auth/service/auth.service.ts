import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignUpForm } from "../model/signupform.model";
import { map } from "rxjs/operators";
import { LoginFormModal } from "../model/loginform.model";
import { environment } from "./../../../environments/environment";
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  saveUserProfile(userData: SignUpForm): Observable<any> {
    return this.http.post(environment.saveUserProfile, userData, {
      headers: { skip: "true", rejectUnauthorized: "false" },
    });
  }

  login(userData: LoginFormModal): Observable<any> {
    return this.http.post(environment.authenticate, userData, {
      headers: { skip: "true" },
    });
  }
}

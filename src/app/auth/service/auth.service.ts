import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SignUpForm } from "../model/signupform.model";
import { map } from "rxjs/operators";
import { LoginFormModal } from "../model/loginform.model";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  saveUserProfile(userData: SignUpForm): Observable<any> {
    return this.http.post("http://localhost:8080/users/register", userData, {
      headers: { skip: "true" },
    });
  }

  login(userData: LoginFormModal): Observable<any> {
    return this.http.post(
      "http://localhost:8080/users/authenticate",
      userData,
      {
        headers: { skip: "true" },
      }
    );
  }
}

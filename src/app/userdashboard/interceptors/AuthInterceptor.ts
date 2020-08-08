import { HTTP_INTERCEPTORS, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get("skip")) return next.handle(req);
    let authReq = req;
    const token = this.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
      });
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigateByUrl("/login");
          localStorage.removeItem("user");
        } else {
          return throwError(error);
        }
      })
    );
  }
  getToken(): string {
    var ret = JSON.parse(localStorage.getItem("user"));
    return ret.token;
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderServicereport } from '../service/loaderreport.service';
@Injectable()
export class LoaderuserdashboardInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderServicereport) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
  }
}

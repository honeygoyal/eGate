import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class LoaderServicereport {
  isLoading = new Subject<boolean>();
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }
}

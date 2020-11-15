import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { map } from "rxjs/operators";
import { isLoggedIn, isLoggedOut } from "../auth/auth.selectors";
import { logout } from "../auth/auth.actions";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { DownloadService } from '../download/downloadservice';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,private router: Router,private downloadSer:DownloadService
  ) {}
  profilePhoto: string;
  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(map(isLoggedOut));

    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      //console.log(data);
      if (data !== undefined) this.profilePhoto = data.user.photo;
    });
  }
  logsoon() {
    event.preventDefault();
    Swal.fire("Registration will start soon!");
  }
  loc:String
  examDownload(exam){
    this.router.navigateByUrl("/download/"+exam)
    this.downloadSer.AClicked(exam)
  }
  downloadSoon() {
    event.preventDefault();
    Swal.fire(" Soon to be Updated!");
  }
  logout() {
    this.store.dispatch(logout());
  }

  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}

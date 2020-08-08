import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { map } from "rxjs/operators";
import { logout } from "src/app/auth/auth.actions";

@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.scss"],
})
export class UserprofileComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}
  name: string;
  branch: string;
  examref: any[];
  selectedItem: string;
  ngOnInit(): void {
    // this.user$ = this.store.pipe(select(user));
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      console.log(data);
      this.name = data.user.name;
      this.branch = data.user.discipline;
      this.examref = [...data.user.examref];
      console.log(data);

    });

    // console.log(this.user$["actionsObserver"]["_value"]["user"]["user"]);
  }
  logout() {
    this.store.dispatch(logout());
  }

  //test-series Selection
  testseries(content: string) {
    this.selectedItem = "GATE-OTS";
    console.log(content);
    var testseriesurl: string =
      "/userdashboard/testseries/" + this.branch + "-" + content + "-OTS";
    var show: boolean = false;
    console.log(this.examref);
    for (let exam of this.examref) {
      if (exam.exam_name_service === "GATE ONLINE TEST SERIES") {
        show = true;
        break;
      }
    }
    if (show) {
      this.router.navigateByUrl(testseriesurl);
    } else {
      this.router.navigateByUrl("/userdashboard/buypackage");
    }
  }

  //demo Selection
  demo(content: string) {
    this.selectedItem = "DEMO";
  }
}

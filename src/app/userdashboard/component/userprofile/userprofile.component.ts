import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { map } from "rxjs/operators";
import { logout } from "src/app/auth/auth.actions";
import { BranchOptedService } from "../../service/branch-opted.service";
import { MatDialog } from "@angular/material/dialog";
import { BranchselectionComponent } from "../branchselection/branchselection.component";

import Swal from "sweetalert2";
@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.scss"],
})
export class UserprofileComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private branchOptedService: BranchOptedService,
    private dialog: MatDialog
  ) {}
  branchOpted: any;
  name: string;
  branches: string[] = [];
  examref: any[];
  selectedItem: string;
  ngOnInit(): void {
    // this.user$ = this.store.pipe(select(user));
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      //console.log(data);
      this.name = data.user.name;
      this.branches = data.user.discipline.split(",");
      this.examref = [...data.user.coursesOffered];
      //console.log(data);
    });
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null && user !== "") {
      let token = user["token"];
      let jwtData = token.split(".")[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (decodedJwtData !== null && decodedJwtData !== "") {
        if (
          decodedJwtData["role"][0] !== null &&
          decodedJwtData["role"][0] !== ""
        ) {
          this.isAdmin = decodedJwtData["role"][0].authority;
        }
      }
    }
  }

  isAdmin: string;
  logout() {
    this.store.dispatch(logout());
  }

  downloadSoon() {
    event.preventDefault();
    Swal.fire(" Soon to be Updated!");
  }

  //test-series Selection
  testseries(content: string) {
    this.branchOpted = this.branchOptedService.getBranch();
    this.selectedItem = this.branchOpted + "-" + content;
    //console.log(content);
    // var testseriesurl: string;
    // var show: boolean = false;
    // //console.log(this.examref);
    // for (let exam of this.examref) {
    //   if (exam.examNameService === "GATE ONLINE TEST SERIES") {
    //     show = true;
    //     let courseOfferedId=exam.id;
    //     testseriesurl =
    //   "/userdashboard/testseries/" + exam.id;
    //     break;
    //   }
    // }
    // if (show) {
    //   this.router.navigateByUrl(testseriesurl);
    // } else {
    //   this.router.navigateByUrl("/userdashboard/buypackage");
    // }
    var testseriesurl: string;
    testseriesurl = "/userdashboard/testseries/" + this.selectedItem;
    this.router.navigateByUrl(testseriesurl);
  }

  //demo Selection
  demo(content: string) {
    this.selectedItem = "DEMO";
  }

  selectBranchDialogOpen() {
    const dialogRef = this.dialog.open(BranchselectionComponent, {
      width: "55%",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.branchOptedService.branchSelected(`${result}`);
      this.branchOpted = `${result}`;
      this.router.navigateByUrl("userdashboard/profile/false");
    });
  }
}

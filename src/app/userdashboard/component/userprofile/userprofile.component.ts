import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
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
  addressLocation: string = location.href;
  isVerified: any;

  ngOnInit(): void {
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      if (data !== undefined) {
        this.name = data.user.name;
        this.branches = data.user.discipline.split(",");
        this.examref = [...data.user.coursesOffered];
        this.isVerified = data.user.isVerified;
      }
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

    this.branchOpted = localStorage.getItem("branchOpted");
    this.branchOptedService.branchSelected(`${this.branchOpted}`);

    if (this.addressLocation.indexOf("/userdashboard/profile/true") > -1) {
      const dialogRef = this.dialog.open(BranchselectionComponent, {
        width: "55%",
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.branchOptedService.branchSelected(`${result}`);
        console.log(`${result}`);
        localStorage.setItem("branchOpted", `${result}`);
        this.branchOpted = `${result}`;
        this.router.navigateByUrl("userdashboard/profile/false");
        if (location.href.indexOf("/userdashboard/profile/") > -1) {
          if (this.isVerified === "UNVERIFIED") {
            Swal.fire(
              "Please upload your photograph, signature and valid Id proof in the profile section to verify the user and get access to the courses."
            );
          } else if (this.isVerified === "PENDING") {
            Swal.fire(
              "Your Verification is still in progress. It will take 24 hours to get verified. For any queries contact helpdesk"
            );
          } else if (this.isVerified === "REJECTED") {
            Swal.fire(
              "One or more of your credentials are not according to the verification requirement(s). Please upload following the instructions given in the Profile section."
            );
          }
        }
      });
    }

    this.route.params.subscribe((params: Params) => {
      this.popupEnabled = params["popupenable"];
    });
    if (this.popupEnabled === "true") {
      const dialogRef = this.dialog.open(BranchselectionComponent, {
        width: "55%",
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.branchOptedService.branchSelected(`${result}`);
        this.branchOpted = `${result}`;
        localStorage.setItem("branchOpted", `${result}`);
        console.log(`${result}`);
      });
    }
  }
  popupEnabled: string;
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

    var testseriesurl: string;
    testseriesurl = "/userdashboard/testseries/" + this.selectedItem;
    this.router.navigateByUrl(testseriesurl);
    //  let address=location.href.split('/');
    //   location.href=address[0]+"//"+address[2]+"/"+address[3]+testseriesurl;
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
      console.log(`${result}`);
      this.branchOpted = `${result}`;
      localStorage.setItem("branchOpted", `${result}`);
      this.router.navigateByUrl("userdashboard/profile/false");
    });
  }

  showSideContent(exam: any) {
    if (exam === "GATE") {
      if (
        this.branchOpted === "CS" ||
        this.branchOpted === "CE" ||
        this.branchOpted === "CH" ||
        this.branchOpted === "ME" ||
        this.branchOpted === "MT" ||
        this.branchOpted === "PI" ||
        this.branchOpted === "MA" ||
        this.branchOpted === "ECE" ||
        this.branchOpted === "EE" ||
        this.branchOpted === "IN" ||
        this.branchOpted === "AE" ||
        this.branchOpted === "XE"
      ) {
        return true;
      }
    }
    if (exam === "ESE") {
      if (
        this.branchOpted === "ME" ||
        this.branchOpted === "CE" ||
        this.branchOpted === "EE" ||
        this.branchOpted === "EXTC"
      ) {
        return true;
      }
    }
    if (exam === "IIT-JAM") {
      if (
        this.branchOpted === "MA" ||
        this.branchOpted === "PH" ||
        this.branchOpted === "MS"
      ) {
        return true;
      }
    }
    if (exam === "TIFR") {
      if (
        this.branchOpted === "MA" ||
        this.branchOpted === "PH" ||
        this.branchOpted === "CS"
      ) {
        return true;
      }
    }
    if (exam === "iPATE") {
      if (
        this.branchOpted === "CS" ||
        this.branchOpted === "CE" ||
        this.branchOpted === "CH" ||
        this.branchOpted === "ME" ||
        this.branchOpted === "MT" ||
        this.branchOpted === "PI" ||
        this.branchOpted === "ECE" ||
        this.branchOpted === "EE" ||
        this.branchOpted === "IN" ||
        this.branchOpted === "AE"
      ) {
        return true;
      }
    }
    if (exam === "JEST") {
      if (this.branchOpted === "PH" || this.branchOpted==="CS") {
        return true;
      }
    }
    if (exam === "ISRO") {
      if (this.branchOpted === "CS" || this.branchOpted==="ME" || this.branchOpted==="CE"|| this.branchOpted==="EE"|| this.branchOpted==="ECE") {
        return true;
      }
    }
    if (exam === "BARC") {
      if (this.branchOpted === "CS" || this.branchOpted==="ME" || this.branchOpted==="CH"|| this.branchOpted==="MT"|| this.branchOpted==="CE"|| this.branchOpted==="EE"|| this.branchOpted==="ECE") {
        return true;
      }
    }
  }
  showPSU(){
    return (this.showSideContent("ISRO") || this.showSideContent("BARC"));
  }
}

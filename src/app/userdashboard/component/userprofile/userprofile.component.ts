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
  branches: string[]=[];
  examref: any[];
  selectedItem: string;
  ngOnInit(): void {
    // this.user$ = this.store.pipe(select(user));
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      //console.log(data);
      this.name = data.user.name;
      this.branches = (data.user.discipline).split(',');
      this.examref = [...data.user.coursesOffered];
      //console.log(data);
    });
    let user=JSON.parse(localStorage.getItem("user"))
    if(user!==null && user!==""){
    let token=user["token"];
     let jwtData = token.split('.')[1]
        let  decodedJwtJsonData = window.atob(jwtData)
         let decodedJwtData = JSON.parse(decodedJwtJsonData)
         if(decodedJwtData!==null && decodedJwtData!==""){
           if(decodedJwtData["role"][0]!==null && decodedJwtData["role"][0]!==""){
         this.isAdmin = decodedJwtData["role"][0].authority
           }
         }
        
    }

  }

  isAdmin:string;
  logout() {
    this.store.dispatch(logout());
  }

  //test-series Selection
  testseries(content: string) {
    this.selectedItem = "GATE-OTS";
    //console.log(content);
    var testseriesurl: string;
    var show: boolean = false;
    //console.log(this.examref);
    for (let exam of this.examref) {
      if (exam.examNameService === "GATE ONLINE TEST SERIES") {
        show = true;
        let courseOfferedId=exam.id;
        testseriesurl =
      "/userdashboard/testseries/" + exam.id;
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

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { environment } from 'src/environments/environment';

export var myWindow;
@Component({
  selector: "app-demoseries",
  templateUrl: "./demoseries.component.html",
  styleUrls: ["./demoseries.component.scss"],
})
export class DemoseriesComponent implements OnInit {
  constructor(private http: HttpClient,
    private route: ActivatedRoute,private store: Store<AppState>,) {}
  colors: any[] = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff3333",
    "#ffff00",
    "#ff6600",
  ];
  pickColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  exams:any=[];
  email:string;
  content:string;
  demoExam:string;
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user"));
    this.email=user.user.emailId;
    this.route.params.subscribe((params: Params) => {
      this.demoExam = params["exam"];
    });
     this.content='DEMO-'+this.demoExam+'-OTS';
   this.http.get(environment.getCoursesDescriptionByExamCode, {
      params: { exam_code: this.content, email: this.email },
    }).subscribe((data)=>{
      this.exams = data;
    })
  }
  startaction(id: string, exam: any) {
    var params =
      "scrollbars=0,resizable=1,fullscreen=1,menubar=0,width=" +
      (screen.width - 20) +
      ", height=" +
      (screen.height - 120) +
      ",statusbar=0,toolbar=0";
    localStorage.setItem("exam", JSON.stringify(exam));
    localStorage.setItem("examStatus", exam.status);
    //localStorage.setItem("timeelapsed",exam.);
    myWindow = window.open("/exampanel/", "windowOpenTab", params);
    if (window.focus) {
      myWindow.focus();
    }
    return false;
  }
}

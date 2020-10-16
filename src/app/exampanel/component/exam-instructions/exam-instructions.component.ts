import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { AppState } from "src/app/reducers";
import { QuestionsService } from "../../services/questions.service";

@Component({
  selector: "app-exam-instructions",
  templateUrl: "./exam-instructions.component.html",
  styleUrls: ["./exam-instructions.component.scss"],
})
export class ExamInstructionsComponent implements OnInit {
  checked: boolean = false;
  data: any;
  exam: any;
  user:any;
  constructor(private route: ActivatedRoute, private router: Router) {}
  linkDisp() {
    this.checked = !this.checked;
  }
  ngOnInit(): void {
    console.log("Route");
    this.exam = JSON.parse(localStorage.getItem("exam"));
    this.user=JSON.parse(localStorage.getItem("user"))
    
    localStorage.removeItem("exam");
    this.data = this.route.data.subscribe((data) => {
   
    });
  }
  test_code: string;
  readyToBegin() {
    // this.urlexam="/exampanel/exam/"+this.exam.courseId;
    // this.router.navigateByUrl("/exampanel/exam/" + this.exam.courseId);
    location.href=location.href+"/exam/"+this.exam.courseId;
  }
}

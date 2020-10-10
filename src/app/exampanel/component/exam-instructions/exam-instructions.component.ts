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
  constructor(private route: ActivatedRoute, private router: Router) {}
  linkDisp() {
    this.checked = !this.checked;
  }
  ngOnInit(): void {
    console.log("Route");
    this.exam = JSON.parse(localStorage.getItem("exam"));
    localStorage.removeItem("exam");
    console.log("Hias", this.exam);
    console.log(this.route);
    this.data = this.route.data.subscribe((data) => {
      console.log(data);
    });
  }
  test_code: string;
  readyToBegin() {
    this.router.navigateByUrl("/exampanel/exam/" + this.exam.courseId);
  }
}

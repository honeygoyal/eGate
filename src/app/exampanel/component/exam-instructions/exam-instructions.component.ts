import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
  user: any;
  profilePhoto: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  linkDisp() {
    this.checked = !this.checked;
  }
  ngOnInit(): void {
    console.log("Route");
    this.exam = JSON.parse(localStorage.getItem("exam"));
    this.user = JSON.parse(localStorage.getItem("user"));
    this.profilePhoto = this.user.user.photo;
    localStorage.removeItem("exam");
    this.data = this.route.data.subscribe((data) => {});
  }
  test_code: string;
  readyToBegin() {
    // this.urlexam="/exampanel/exam/"+this.exam.courseId;
    // this.router.navigateByUrl("/exampanel/exam/" + this.exam.courseId);
    location.href = location.href + "/exam/" + this.exam.courseId;
    location.reload();
  }
  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}

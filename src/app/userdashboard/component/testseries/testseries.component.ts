import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TestseriesService } from "../../service/testseries.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { map, filter } from "rxjs/operators";
import { DatePipe } from "@angular/common";
import { MatPaginator } from "@angular/material/paginator";

export var myWindow;
export var examsExport;
@Component({
  selector: "app-testseries",
  templateUrl: "./testseries.component.html",
  styleUrls: ["./testseries.component.scss"],
})
export class TestseriesComponent implements OnInit {
  exam_code: string;
  email: string;
  exams: any[] = [];
  examsinprogress: any[] = [];
  examscompleted: any[] = [];
  currentDateAsString = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  constructor(
    private route: ActivatedRoute,
    private testseries: TestseriesService,
    private store: Store<AppState>,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.exam_code = params["subject"];
    });
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      if (data !== undefined) this.email = data.user.emailId;
      this.testseries
        .getTestSeries(this.exam_code, this.email)
        .subscribe((data) => {
          this.exams = data;
          this.filterexams();
        });
    });
  }

  filterexams() {
    let currentDate = new Date(this.currentDateAsString);
    for (let exam of this.exams) {
      if (exam.status === "PENDING") {
        let endDate = new Date(exam.endDate);
        let daysRemaining = "";
        let diffDays: any;
        exam.isExamActive = true;
        if (endDate >= currentDate) {
          let timeDiff = Math.abs(endDate.getTime() - currentDate.getTime());
          diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          daysRemaining = daysRemaining.concat(
            diffDays.toString(),
            " days left for the exam to expire"
          );
        } else if (currentDate > endDate) {
          daysRemaining = "Exam has already expired";
          exam.isExamActive = false;
          exam.checkForRemainingDays = daysRemaining;
        }
        if (diffDays <= 30) {
          exam.checkForRemainingDays = daysRemaining;
        }

        this.examsinprogress.push(exam);
      }
      if (exam.status === "START") {
        let startDate = new Date(exam.startDate);
        if (startDate > currentDate) {
          exam.isExamActive = false;
        } else if (currentDate >= startDate) {
          exam.isExamActive = true;
        }
      }
      if (exam.status === "COMPLETED") {
        this.examscompleted.push(exam);
      }
    }
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
  // examspage: any;
  // onPageChange($event) {
  //   this.examspage = this.exams.slice(
  //     $event.pageIndex * $event.pageSize,
  //     $event.pageIndex * $event.pageSize + $event.pageSize
  //   );
  // }
  reportshow(exam: any) {
    this.router.navigateByUrl("/userdashboard/report/" + exam.id);
  }
}

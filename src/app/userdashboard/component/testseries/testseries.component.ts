import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { TestseriesService } from "../../service/testseries.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { map, filter } from "rxjs/operators";

export var myWindow;

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
  constructor(
    private route: ActivatedRoute,
    private testseries: TestseriesService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.exam_code = params["subject"];
    });
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      this.email = data.user.email;
      this.testseries
        .getTestSeries(this.exam_code, this.email)
        .subscribe((data) => {
          this.exams = [...data];
          this.filterexams();
          console.log(this.exams);
        });
    });
  }

  filterexams() {
    for (let exam of this.exams) {
      if (exam.status === "PENDING") {
        this.examsinprogress.push(exam);
      }
      if (exam.status === "COMPLETED") {
        this.examscompleted.push(exam);
      }
    }
  }

  startaction(test_id: string) {
    // console.log(test_id);
    console.log();
    myWindow = window.open(
      "/exampanel/" + test_id,
      "",
      "width=1000,height=700"
    );
    console.log(myWindow);
    myWindow.focus();
  }

  reportshow(exam: any) {
    this.router.navigateByUrl("/userdashboard/report");
  }
}

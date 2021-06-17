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
  
activePageDataChunk:any = []
activePageDataChunkInProgress = []
activePageDataChunkCompleted = []
  // MatPaginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [3, 5, 8, 10];
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.exams.slice(firstCut, secondCut);
    this.activePageDataChunkInProgress = this.examsinprogress.slice(firstCut,secondCut);
    this.activePageDataChunkCompleted = this.examscompleted.slice(firstCut,secondCut);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  exam_code: string;
  email: string;
  exams: any[] = [];
  examsinprogress: any[] = [];
  examscompleted: any[] = [];
  currentDateAsString = this.datepipe.transform(new Date(), "yyyy-MM-dd");
  onlineTestSeriesLink: string = "/courses";

  constructor(
    private route: ActivatedRoute,
    private testseries: TestseriesService,
    private store: Store<AppState>,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      if (data !== undefined) this.email = data.user.emailId;
    this.route.params.subscribe((params: Params) => {
      this.exam_code = params["subject"];

      this.testseries
      .getTestSeries(this.exam_code, this.email)
      .subscribe((data) => {
        if (data !== null) {
          this.exams = [...data];
          this.activePageDataChunk = this.exams.slice(0,this.pageSize);
          if(this.exams.length!==0)
          this.filterexams();
          this.activePageDataChunkInProgress = this.examsinprogress.slice(0,this.pageSize);
          this.activePageDataChunkCompleted = this.examscompleted.slice(0,this.pageSize);

        }
      });
    });
    

     
    });

    let indexChar = "GATE-OTS";
    if (location.href.toLowerCase().indexOf(indexChar.toLowerCase()) > -1) {
      this.onlineTestSeriesLink = "/courses/gate/online test series";
    }
    
  }

  filterexams() {
    let currentDate = new Date(this.currentDateAsString);
    for (let exam of this.exams) {
      let str = exam.description;
      // str = str.replace(/Basic/g,);
       //str = str.replace(/and/g,);
      let matches = str.match(/\b(\w)/g);
      let acronym = matches.join("");

      exam.abTitle = acronym;
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
        let endDate = new Date(exam.endDate);

        if (startDate > currentDate) {
          exam.isExamActive = false;
        } else if (currentDate >= startDate && currentDate <= endDate) {
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
    myWindow = window.open("#/exampanel/", "windowOpenTab", params);
    if (window.focus) {
      myWindow.focus();
    }
    return false;
  }

  reportshow(exam: any) {
    this.router.navigateByUrl("/userdashboard/report/" + exam.id);
  }
  loading: boolean;
}

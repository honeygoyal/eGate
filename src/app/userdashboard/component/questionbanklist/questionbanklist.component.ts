import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { TestseriesService } from '../../service/testseries.service';

import { map, filter } from "rxjs/operators";


export var myWindow;
export var examsExport;
@Component({
  selector: 'app-questionbanklist',
  templateUrl: './questionbanklist.component.html',
  styleUrls: ['./questionbanklist.component.scss']
})
export class QuestionbanklistComponent implements OnInit {
  exam_code: string;
  email: string;
  
  exams: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private testseries: TestseriesService,
    private store: Store<AppState>,
    private router: Router,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      if (data !== undefined) this.email = data.user.emailId;
    this.route.params.subscribe((params: Params) => {
      this.exam_code = params["subject"];

      this.testseries
      .getQuestionBank(this.exam_code, this.email)
      .subscribe((data) => {
        if (data !== null) {
          console.log(data);
          this.exams = [...data];
        }
      });
    });
    });
  }

  startaction(id: string, exam: any) {
    var params =
      "scrollbars=0,resizable=1,fullscreen=1,menubar=0,width=" +
      (screen.width - 20) +
      ", height=" +
      (screen.height - 120) +
      ",statusbar=0,toolbar=0";
    localStorage.setItem("exam", JSON.stringify(exam));
    myWindow = window.open("#/questionbankpanel/qb/"+exam.courseId, "windowOpenTab", params);
    if (window.focus) {
      myWindow.focus();
    }
    return false;
  }

}

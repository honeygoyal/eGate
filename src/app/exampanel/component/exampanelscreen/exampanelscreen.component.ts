import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  OnDestroy,
  Inject,
} from "@angular/core";
import Swal from "sweetalert2";
import { QuestionsService } from "../../services/questions.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { map } from "rxjs/operators";
import { CountdownComponent } from "ngx-countdown";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { DomSanitizer } from "@angular/platform-browser";
import { Useranswer } from "../../model/Useranswer.model";
import { NgForm } from "@angular/forms";
import { Subject, interval } from "rxjs";
import { TimerService } from "src/app/shared/timer.service";
import { myWindow } from "src/app/userdashboard/component/testseries/testseries.component";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";

export interface DialogData {
  animal: "panda" | "unicorn" | "lion";
}
@Component({
  selector: "app-exampanelscreen",
  templateUrl: "./exampanelscreen.component.html",
  styleUrls: ["./exampanelscreen.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ExampanelscreenComponent implements OnInit, OnDestroy {
  //variables
  calcstatus = false;
  count = 1;
  duration: string;
  status = "start";
  countdownconfig: any;
  test_code: string;
  email: string;
  tabselected: string;
  question: any;
  name: string;
  length: number;
  gridContainer: any;
  attempts = 3;
  timer = 1;
  questionGroup: any[];
  questiontoShow: any;
  answerDataofUser: Useranswer[] = [];
  currentOption = "z";
  selectedTabCurrent: string;
  test_title: string;
  submit_button_status: boolean = true;
  courseId: number;
  userId: number;
  notVisitedCount: number;
  //constructorftransform
  constructor(
    private quesService: QuestionsService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
    private timerService: TimerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.gridContainer = document.getElementsByClassName("grid-container");
  }

  openDialog() {
    console.log(this.question);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "80vw",
      maxHeight: "80vh",
      data: { question: this.question },
    });
  }

  //ngOninit
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.test_code = params["test_id"];
      console.log("test_code: " + params["test_id"]);
    });
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      this.email = data.user.emailId;
      this.name = data.user.name;
      this.userId = data.user.id;

      this.quesService
        .getQuestionsForTestSeries(this.test_code)
        .subscribe((data) => {
          this.question = data;
          console.log(this.question);
        });
    });
  }

  //methods
  @ViewChild(CountdownComponent, { static: true }) counter: CountdownComponent;
  resetTimer() {
    this.counter.restart();
    this.counter.stop();
    this.counter.pause();
    this.counter.resume();
  }

  @HostListener("window:focus", ["$event"])
  onfocus(event: any): void {
    // Do something
  }

  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  // @HostListener("window:blur", ["$event"])
  // onblur(event: any): void {
  //   if (this.attempts !== 0) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Window Changed Alert",
  //       text: this.attempts + " attempts left",
  //     });
  //     this.attempts = this.attempts - 1;
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Maximum attempt tried",
  //       text: "You exam has ended",
  //     });
  //     window.close();
  //   }
  // }

  @HostListener("window:unload", ["$event"])
  unloadHandler(event) {
    alert("unload");
  }

  // @HostListener("window:beforeunload", ["$event"])
  // beforeUnloadHandler(event) {
  //   alert("bunload");
  // }

  optionSelectedpreviously(ques_Id: number) {
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === ques_Id) {
        this.currentOption = element.answerSubmitted;
      }
    });
    console.log(this.currentOption);
  }

  getColor(group: any): string {
    var returnColor: string = "White";
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === group.id) {
        returnColor = this.finalColor(element.questionStatus);
      }
    });
    return returnColor;
  }

  finalColor(status: String): string {
    switch (status) {
      case "ANS":
        return "#99D12A";
      case "NO_ANS":
        return "#D03B06";
      case "MARK_ANS":
        return "#6C63FF";
      case "MARK_NOANS":
        return "#6C63FF";
      default:
        return "white";
    }
  }

  getBorder(group: any): string {
    var returnString: string = "1px solid white";
    if (group.id === this.questiontoShow.id) {
      returnString = "2px solid #07C4FB";
    }
    return returnString;
  }
  selectedTab(event: MatTabChangeEvent, prevquestion: any) {
    this.count = 1;
    var t: string;
    var r: string;
    console.log(prevquestion);
    if (prevquestion !== undefined) {
      console.log("");
      this.end = new Date().getTime();
      this.answerDataofUser.forEach((element, index) => {
        if (element.questionId === prevquestion["id"]) {
          t = element.answerSubmitted;
          r = element.questionStatus;
        }
      });
      console.log(t);
      console.log(r);

      this.pushToArray(this.answerDataofUser, {
        questionId: prevquestion["id"],
        timetaken: this.end - this.start,
        answerSubmitted: t === undefined ? null : t,
        status: r === undefined ? "UNANSWERED" : r,
      });
    }
    this.selectedTabCurrent = event.tab.textLabel;
    var sect = event.tab.textLabel;
    this.duration = [...this.question[sect]][0]["courseId"]["duration"];
    this.test_title = [...this.question[sect]][0]["courseId"]["title"];
    this.courseId = [...this.question[sect]][0]["courseId"]["id"];
    this.notVisitedCount = [...this.question[sect]].length;
    if (this.timer === 1) {
      this.countdownconfig = {
        leftTime: +this.duration * 60,
        format: "H:m:s",
      };
      this.timer = 0;
    }
    this.questionGroup = [...this.question[sect]];
    console.log(this.questionGroup);
    console.log(this.questionGroup);
    this.questiontoShow = {
      ...this.questionGroup[0],
    };
    this.start = new Date().getTime();
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        this.currentOption = element.answerSubmitted;
      }
    });
  }
  start: any;
  end: any;

  questiontodisplayincrement(form: NgForm, quesId: number) {
    this.end = new Date().getTime();
    console.log(form.value.optionSelected);
    if (
      form.value.optionSelected === "z" ||
      form.value.optionSelected === null
    ) {
      this.pushToArray(this.answerDataofUser, {
        questionId: quesId,
        status: "NO_ANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      });

      this.savetheanswer(
        form.value.optionSelected,
        quesId,
        "NO_ANS",
        this.end - this.start
      );
    } else {
      this.pushToArray(this.answerDataofUser, {
        questionId: quesId,
        status: "ANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      });
      this.savetheanswer(
        form.value.optionSelected,
        quesId,
        "ANS",
        this.end - this.start
      );
    }

    console.log(this.answerDataofUser);
    if (this.count === this.questionGroup.length) {
      if (this.tabGroup["selectedIndex"]++ >= this.questionGroup.length)
        this.tabGroup["selectedIndex"] = 0;
      else this.tabGroup["selectedIndex"]++;
      this.count = 0;
    }

    this.questiontoShow = {
      ...this.questionGroup[this.count],
    };

    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        this.currentOption = element.answerSubmitted;
      }
    });
    form.reset();
    this.start = new Date().getTime();
    this.count++;
  }

  markforreviewfun(form: NgForm, quesId: number) {
    this.end = new Date().getTime();
    if (
      form.value.optionSelected === "z" ||
      form.value.optionSelected === null
    ) {
      this.pushToArray(this.answerDataofUser, {
        questionId: quesId,
        status: "MARK_NOANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      });

      this.savetheanswer(
        form.value.optionSelected,
        quesId,
        "MARK_NOANS",
        this.end - this.start
      );
    } else {
      this.pushToArray(this.answerDataofUser, {
        questionId: quesId,
        status: "MARK_ANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      });

      this.savetheanswer(
        form.value.optionSelected,
        quesId,
        "MARK_ANS",
        this.end - this.start
      );
    }

    if (this.count === this.questionGroup.length) {
      if (this.tabGroup["selectedIndex"]++ >= this.questionGroup.length)
        this.tabGroup["selectedIndex"] = 0;
      else this.tabGroup["selectedIndex"]++;
      this.count = 0;
    }
    this.questiontoShow = {
      ...this.questionGroup[this.count],
    };
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        this.currentOption = element.answerSubmitted;
      }
    });
    form.reset();
    this.count++;
    this.start = new Date().getTime();
  }

  timesUp(event) {
    console.log(event);

    if (
      event["action"] === "done" &&
      event["left"] === 0 &&
      event["status"] === 3
    ) {
      this.submittheanswer(true);
      //console.log("finished");
    }
  }

  clearResponse(form: NgForm, quesId: number) {
    form.reset();
    this.pushToArray(this.answerDataofUser, {
      questionId: quesId,
      status: "UNANSWERED",
      answerSubmitted: form.value.optionSelected,
      timetaken: "4",
    });
  }

  // pushToArray(arr, obj) {
  //   var existingIds = arr.map((obj) => obj.question_id);

  //   if (!existingIds.includes(obj.question_id)) {
  //     arr.push(obj);
  //   } else {
  //     arr.forEach((element, index) => {
  //       if (element.question_id === obj.question_id) {
  //         arr[index] = obj;
  //       }
  //     });
  //   }
  // }
  pushToArray(arr, obj) {
    var existingIds = arr.map((obj) => obj.questionId);

    if (!existingIds.includes(obj.questionId)) {
      arr.push(obj);
    } else {
      arr.forEach((element, index) => {
        if (element.questionId === obj.questionId) {
          obj.timetaken += element.timetaken;

          arr[index] = obj;
        }
      });
    }
  }

  sidebuttonforquestion(position: number, prevquestion: any) {
    console.log("previous question");
    console.log(prevquestion);
    this.questiontoShow = {
      ...this.questionGroup[position - 1],
    };

    // this.end = new Date().getTime();
    // this.pushToArray(this.answerDataofUser, {
    //   question_id: prevquestion["id"],
    //   timetaken: this.start - this.end,
    //   answerSubmitted: null,
    //   status: "UNANSWERED",
    // });
    var t: string;
    var r: string;
    if (prevquestion !== undefined) {
      console.log("");
      this.end = new Date().getTime();
      this.answerDataofUser.forEach((element, index) => {
        if (element.questionId === prevquestion["id"]) {
          t = element.answerSubmitted;
          r = element.questionStatus;
        }
      });
      console.log(t);
      console.log(r);

      this.pushToArray(this.answerDataofUser, {
        questionId: prevquestion["id"],
        timetaken: this.end - this.start,
        answerSubmitted: t === undefined ? null : t,
        status: r === undefined ? "UNANSWERED" : r,
      });
    }

    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        this.currentOption = element.answerSubmitted;
      }
    });
    this.count = position;
    this.start = new Date().getTime();
  }

  @ViewChild("tabGroup", { static: true })
  tabGroup;

  scrollTabs(event) {
    const children = this.tabGroup._tabHeader._elementRef.nativeElement
      .children;
    const back = children[0];
    const forward = children[2];
    if (event.deltaY > 0) {
      forward.click();
    } else {
      back.click();
    }
  }

  hidecalc() {
    let clsBtn = document.getElementById("keyPad");
    if (clsBtn.style.display === "none" || clsBtn.style.display === "") {
      clsBtn.style.display = "block";
      this.calcstatus = true;
    } else {
      clsBtn.style.display = "none";
      this.calcstatus = false;
    }
  }

  ngOnDestroy() {
    alert(`I'm leaving the app!`);
  }

  savetheanswer(
    answerSubmitted: string,
    questionId: number,
    questionStatus: string,
    timeTaken: number
  ) {
    this.quesService
      .postSavedAnswer({
        answerSubmitted: answerSubmitted,
        courseId: +this.courseId,
        questionId: questionId,
        questionStatus: questionStatus,
        timeTaken: timeTaken,
        userId: +this.userId,
      })
      .subscribe(
        (data) => {
          console.log("Successfully saved the answer");
        },
        (err) => {
          console.log(err);
        }
      );
  }

  submittheanswer(exam_over: boolean) {
    if (exam_over) {
      console.log("Exam is over");
      //window.close();
      this.quesService
        .postSubmittedAnswer({
          courseId: +this.courseId,
          status: "COMPLETED",
          totalTime: "0",
          userId: +this.userId,
        })
        .subscribe(
          (data) => {
            //console.log("Window close");
            //console.log(window.length);
            console.log("Closing the window");
            window.close();

            //myWindow.close();
          },
          (err) => {
            console.log(err);
            //window.close();
          }
        );
    }
  }
}

// Swal.fire({
//   title: "Are you sure?",
//   text: "You want to End the Exam?",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, Save it!",
// }).then((result) => {
//   if (result.value) {
//     Swal.fire("Saved!", "Exam Over", "success");
//   }
//   window.close();
// });

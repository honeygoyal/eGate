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
import "./../../../../assets/virtual_keyboard.js";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";
import { InstructionDialogComponent } from "./instruction-dialog/instruction-dialog.component";


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
  currentOption = "";
  selectedTabCurrent: string;
  test_title: string;
  submit_button_status: boolean = true;
  courseId: number;
  userId: number;
  notVisitedCount: number;
  markedForReviewCount: number = 0;
  markedForReviewWithAnswerCount: number = 0;
  answeredCount: number = 0;
  notAnsweredCount: number = 1;

  totalNotVisitedCount: number;
  totalMarkedForReviewCount: number;
  totalMarkedForReviewWithAnswerCount: number;
  totalAnsweredCount: number;
  totalNotAnsweredCount: number;

  sectionansweredCount: string = "answeredCount";
  sectionnotAnsweredCount: string = "notAnsweredCount";
  sectionmarkedForReviewCount: string = "markedForReviewCount";
  sectionmarkedForReviewWithAnswerCount: string =
    "markedForReviewWithAnswerCount";
  sectionnotvisitedCount: string = "notVisitedCount";

  sect: string;
  startingTime = new Date().getTime();
  //constructor
  totalquestions: string;
  totalmarks: string;
  testname: string;
  natInput: string = "";
  IsAChecked: boolean;
  IsBChecked: boolean;
  IsCChecked: boolean;
  IsDChecked: boolean;
  finalCheckedValue: boolean = false;
  totalOptionsChecked: string = "";
  examStatus = "";
  initializeCounts: boolean = false;
  localStorageNATKey: string = "natActiveValue";
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

  questionDialog() {
    console.log(this.question);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "80vw",
      maxHeight: "80vh",
      data: { question: this.question },
    });
  }
  instructionDialog() {
    const dialogRef = this.dialog.open(InstructionDialogComponent, {
      width: "80vw",
      maxHeight: "80vh",
      data: {
        duration: this.duration,
        totalquestions: this.totalquestions,
        totalmarks: this.totalmarks,
        testname: this.test_title,
      },
    });
  }
  profilePhoto: any;
  //ngOninit
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.test_code = params["test_id"];
    });
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      this.email = data.user.emailId;
      this.name = data.user.name;
      this.userId = data.user.id;
      this.profilePhoto = data.user.photo;
      this.examStatus = localStorage.getItem("examStatus");
      this.quesService
        .getQuestionsForTestSeries(this.test_code, this.userId)
        .subscribe((data) => {
          this.question = data;
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

  assignMSQOptionsChecked(answerSubmitted: string) {
    switch (answerSubmitted) {
      case "A":
        this.IsAChecked = true;
        break;
      case "B":
        this.IsBChecked = true;
        break;
      case "C":
        this.IsCChecked = true;
        break;
      case "D":
        this.IsDChecked = true;
        break;
    }
  }

  onMSQChange($event, passedOption) {
    switch (passedOption) {
      case "A":
        this.IsAChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
        break;
      case "B":
        this.IsBChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
        break;
      case "C":
        this.IsCChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
        break;
      case "D":
        this.IsDChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
        break;
    }
  }

  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  @HostListener("window:blur", ["$event"])
  onblur(event: any): void {
    if (this.attempts !== 0) {
      Swal.fire({
        icon: "error",
        title: "Window Changed Alert",
        text: this.attempts + " attempts left",
      });
      this.attempts = this.attempts - 1;
    } else {
      Swal.fire({
        icon: "error",
        title: "Maximum attempt tried",
        text: "You exam has ended",
      });
      window.close();
    }
  }

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
  }

  getStyles(group: any): any {
    let myStyles = {
      background: "url('./../../../../assets/questions-sprite.png') no-repeat",
      color: "black",
      "background-position": "-157px -4px",
      padding: "8px",
      height: "48px",
    };
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === group.id) {
        let finalPosition = this.finalPosition(element.questionStatus);
        myStyles = {
          background: "url('./../../../../assets/questions-sprite.png') no-repeat",
          color: "white",
          "background-position": finalPosition,
          padding: "8px",
          height: "48px",
        };
      }
    });
    return myStyles;
  }

  finalPosition(status: String): string {
    switch (status) {
      case "ANS":
        return "-4px -126px";
      case "NO_ANS":
        return "-57px -6px";
      case "MARK_ANS":
        return "-66px -178px";
      case "MARK_NOANS":
        return "-108px -1px";
      default:
        return "-157px -4px";
    }
  }

  selectedTab(event: MatTabChangeEvent, prevquestion: any) {
    this.count = 1;
    var t: string;
    var r: string;

    if (prevquestion !== undefined) {
      this.end = new Date().getTime();
      this.answerDataofUser.forEach((element, index) => {
        if (element.questionId === prevquestion["id"]) {
          t = element.answerSubmitted;
          r = element.questionStatus;
        }
      });

      this.pushToArray(
        this.answerDataofUser,
        {
          questionId: prevquestion["id"],
          timetaken: this.end - this.start,
          answerSubmitted: t === undefined ? null : t,
          questionStatus: r === undefined ? "NO_ANS" : r,
        },
        true,
        false
      );
    }

    this.selectedTabCurrent = event.tab.textLabel;
    this.sect = event.tab.textLabel;
    this.duration = [...this.question[this.sect]][0]["courseId"]["duration"];
    this.test_title = [...this.question[this.sect]][0]["courseId"]["title"];
    this.courseId = [...this.question[this.sect]][0]["courseId"]["id"];
    this.totalmarks = [...this.question[this.sect]][0]["courseId"][
      "totalMarks"
    ];
    this.totalquestions = [...this.question[this.sect]][0]["courseId"][
      "totalQuestion"
    ];

    if (this.localStorageNATKey === "natActiveValue") {
      this.localStorageNATKey =
        this.localStorageNATKey + this.test_title.replace(" ", "");
      localStorage.setItem(this.localStorageNATKey, "");
    }

    [...this.question[this.sect]][0][this.sectionansweredCount] =
      [...this.question[this.sect]][0][this.sectionansweredCount] === undefined
        ? 0
        : [...this.question[this.sect]][0][this.sectionansweredCount];
    [...this.question[this.sect]][0][this.sectionnotAnsweredCount] =
      [...this.question[this.sect]][0][this.sectionnotAnsweredCount] ===
      undefined
        ? 0
        : [...this.question[this.sect]][0][this.sectionnotAnsweredCount];
    [...this.question[this.sect]][0][this.sectionmarkedForReviewCount] =
      [...this.question[this.sect]][0][this.sectionmarkedForReviewCount] ===
      undefined
        ? 0
        : [...this.question[this.sect]][0][this.sectionmarkedForReviewCount];
    [...this.question[this.sect]][0][
      this.sectionmarkedForReviewWithAnswerCount
    ] =
      [...this.question[this.sect]][0][
        this.sectionmarkedForReviewWithAnswerCount
      ] === undefined
        ? 0
        : [...this.question[this.sect]][0][
            this.sectionmarkedForReviewWithAnswerCount
          ];
    [...this.question[this.sect]][0][this.sectionnotvisitedCount] =
      [...this.question[this.sect]][0][this.sectionnotvisitedCount] ===
      undefined
        ? [...this.question[this.sect]].length
        : [...this.question[this.sect]][0][this.sectionnotvisitedCount];

    this.answeredCount = [...this.question[this.sect]][0][
      this.sectionansweredCount
    ];
    this.notAnsweredCount = [...this.question[this.sect]][0][
      this.sectionnotAnsweredCount
    ];

    this.markedForReviewCount = [...this.question[this.sect]][0][
      this.sectionmarkedForReviewCount
    ];
    this.markedForReviewWithAnswerCount = [...this.question[this.sect]][0][
      this.sectionmarkedForReviewWithAnswerCount
    ];
    this.notVisitedCount = [...this.question[this.sect]][0][
      this.sectionnotvisitedCount
    ];

    this.calculateTotalCount();

    if (this.timer === 1) {
      this.countdownconfig = {
        leftTime: +this.duration * 60,
        format: "H:m:s",
      };
      this.timer = 0;
    }
    this.questionGroup = [...this.question[this.sect]];
    this.questiontoShow = {
      ...this.questionGroup[0],
    };
    this.start = new Date().getTime();

    let assignedCurrentOption = false;
    let missedOutOnCurrentOption = false;
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        if (this.questiontoShow.questionType === "MSQ") {
          this.IsAChecked = false;
          this.IsBChecked = false;
          this.IsCChecked = false;
          this.IsDChecked = false;
          if (element.answerSubmitted !== null) {
            let checkBoxOptions = element.answerSubmitted
              .split("(")
              .join("")
              .split(")")
              .join("")
              .split(",");
            checkBoxOptions.forEach((checkedOption) => {
              this.assignMSQOptionsChecked(checkedOption);
            });
          }
        } else {
          this.currentOption = element.answerSubmitted;
        }
        assignedCurrentOption = true;
      } else {
        missedOutOnCurrentOption = true;
      }
    });

    if (
      !assignedCurrentOption &&
      this.examStatus === "PENDING" &&
      !this.initializeCounts
    ) {
      if (this.questiontoShow.answerSubmitted !== null) {
        this.assignPreviouslySubmittedAnswer(
          this.questiontoShow.answerSubmitted
        );
      }

      Object.keys(this.question).forEach((key) => {
        let sectionQuestions = [...this.question[key]];
        let sectionLength = sectionQuestions.length;
        sectionQuestions[0].notVisitedCount =
          sectionQuestions[0].notVisitedCount === undefined
            ? sectionLength
            : sectionQuestions[0].notVisitedCount;

        sectionQuestions.forEach((examQuestion) => {
          if (examQuestion.questionStatus !== null) {
            this.pushToArray(
              this.answerDataofUser,
              {
                questionId: examQuestion.id,
                timetaken: this.end - this.start,
                answerSubmitted: examQuestion.answerSubmitted,
                questionStatus: examQuestion.questionStatus,
              },
              false,
              true
            );

            switch (examQuestion.questionStatus) {
              case "ANS":
                sectionQuestions[0].answeredCount =
                  sectionQuestions[0].answeredCount === undefined
                    ? 1
                    : sectionQuestions[0].answeredCount + 1;
                this.answeredCount = sectionQuestions[0].answeredCount;
                this.totalAnsweredCount = this.totalAnsweredCount + 1;
                if (sectionQuestions[0].notVisitedCount - 1 >= 0) {
                  sectionQuestions[0].notVisitedCount =
                    sectionQuestions[0].notVisitedCount - 1;
                  this.notVisitedCount = sectionQuestions[0].notVisitedCount;
                  if (this.totalNotVisitedCount - 1 >= 0) {
                    this.totalNotVisitedCount = this.totalNotVisitedCount - 1;
                  }
                }
                break;
              case "NO_ANS":
                sectionQuestions[0].notAnsweredCount =
                  sectionQuestions[0].notAnsweredCount === undefined
                    ? 1
                    : sectionQuestions[0].notAnsweredCount + 1;
                this.notAnsweredCount = sectionQuestions[0].notAnsweredCount;
                this.totalNotAnsweredCount = this.totalNotAnsweredCount + 1;
                if (sectionQuestions[0].notVisitedCount - 1 >= 0) {
                  sectionQuestions[0].notVisitedCount =
                    sectionQuestions[0].notVisitedCount - 1;
                  this.notVisitedCount = sectionQuestions[0].notVisitedCount;
                  if (this.totalNotVisitedCount - 1 >= 0) {
                    this.totalNotVisitedCount = this.totalNotVisitedCount - 1;
                  }
                }
                break;
              case "MARK_ANS":
                sectionQuestions[0].markedForReviewWithAnswerCount =
                  sectionQuestions[0].markedForReviewWithAnswerCount ===
                  undefined
                    ? 1
                    : sectionQuestions[0].markedForReviewWithAnswerCount + 1;
                this.markedForReviewWithAnswerCount =
                  sectionQuestions[0].markedForReviewWithAnswerCount;
                this.totalMarkedForReviewWithAnswerCount =
                  this.totalMarkedForReviewWithAnswerCount + 1;
                if (sectionQuestions[0].notVisitedCount - 1 >= 0) {
                  sectionQuestions[0].notVisitedCount =
                    sectionQuestions[0].notVisitedCount - 1;
                  this.notVisitedCount = sectionQuestions[0].notVisitedCount;
                  if (this.totalNotVisitedCount - 1 >= 0) {
                    this.totalNotVisitedCount = this.totalNotVisitedCount - 1;
                  }
                }
                break;
              case "MARK_NOANS":
                sectionQuestions[0].markedForReviewCount =
                  sectionQuestions[0].markedForReviewCount === undefined
                    ? 1
                    : sectionQuestions[0].markedForReviewCount + 1;
                this.markedForReviewCount =
                  sectionQuestions[0].markedForReviewCount;
                this.totalMarkedForReviewCount =
                  this.totalMarkedForReviewCount + 1;
                if (sectionQuestions[0].notVisitedCount - 1 >= 0) {
                  sectionQuestions[0].notVisitedCount =
                    sectionQuestions[0].notVisitedCount - 1;
                  this.notVisitedCount = sectionQuestions[0].notVisitedCount;
                  if (this.totalNotVisitedCount - 1 >= 0) {
                    this.totalNotVisitedCount = this.totalNotVisitedCount - 1;
                  }
                }
                break;
            }
          }
        });
      });

      this.initializeCounts = true;
    }

    // if (!assignedCurrentOption && missedOutOnCurrentOption) {
    //   if (form !== undefined) {
    //     form.reset();
    //   }
    // }
  }
  start: any;
  end: any;

  questiontodisplayincrement(form: NgForm, quesId: number, quesType: string) {
    this.end = new Date().getTime();
    let submittedTextValue = "natNotSelected";
    if (localStorage.getItem("natActiveValue") !== "") {
      this.natInput = localStorage.getItem("natActiveValue");
    } else if (localStorage.getItem(this.localStorageNATKey) !== "") {
      this.natInput = localStorage.getItem(this.localStorageNATKey);
    } else if (
      localStorage.getItem("natActiveValue") === "" &&
      localStorage.getItem(this.localStorageNATKey) === ""
    ) {
      this.natInput = "";
    }

    if (quesType === "NAT") {
      submittedTextValue = this.natInput;
    }
    if (quesType === "MCQ" || quesType === "NAT") {
      this.finalCheckedValue = true;
    }

    if (quesType === "MSQ") {
      if (this.totalOptionsChecked === "") {
        this.answerDataofUser.forEach((element, index) => {
          if (element.questionId === this.questiontoShow.id) {
            this.finalCheckedValue = true;
            this.totalOptionsChecked = element.answerSubmitted;
          }
        });
      }
    }

    if (
      form.value.optionSelected === "" ||
      form.value.optionSelected === null ||
      submittedTextValue === "" ||
      this.finalCheckedValue === false
    ) {
      let selectedValue = form.value.optionSelected;
      this.finalCheckedValue = false;
      if (quesType === "NAT") {
        selectedValue = null;
      }

      if (quesType === "MSQ") {
        this.totalOptionsChecked = "";
        selectedValue = null;
      }

      this.pushToArray(
        this.answerDataofUser,
        {
          questionId: quesId,
          questionStatus: "NO_ANS",
          answerSubmitted: selectedValue,
          timetaken: this.end - this.start,
        },
        false,
        false
      );

      this.savetheanswer(
        selectedValue,
        quesId,
        "NO_ANS",
        this.end - this.start
      );
    } else {
      let selectedValue = form.value.optionSelected;

      if (quesType === "MCQ") {
        this.finalCheckedValue = false;
      }

      if (quesType === "NAT") {
        selectedValue = submittedTextValue;
        this.finalCheckedValue = false;
        localStorage.setItem(this.localStorageNATKey, selectedValue);
        localStorage.setItem("natActiveValue", "");
      }

      if (quesType === "MSQ") {
        let listOfCheckedValues = "(";
        if (this.IsAChecked) {
          listOfCheckedValues = listOfCheckedValues + "A,";
        }
        if (this.IsBChecked) {
          listOfCheckedValues = listOfCheckedValues + "B,";
        }
        if (this.IsCChecked) {
          listOfCheckedValues = listOfCheckedValues + "C,";
        }
        if (this.IsDChecked) {
          listOfCheckedValues = listOfCheckedValues + "D,";
        }

        listOfCheckedValues =
          listOfCheckedValues.substring(0, listOfCheckedValues.length - 1) +
          ")";
        selectedValue = listOfCheckedValues;
        this.finalCheckedValue = false;
        this.totalOptionsChecked = "";
      }

      this.pushToArray(
        this.answerDataofUser,
        {
          questionId: quesId,
          questionStatus: "ANS",
          answerSubmitted: selectedValue,
          timetaken: this.end - this.start,
        },
        false,
        false
      );

      this.savetheanswer(selectedValue, quesId, "ANS", this.end - this.start);
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

    let assignedCurrentOption = false;
    let missedOutOnCurrentOption = false;
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        if (this.questiontoShow.questionType === "MSQ") {
          this.IsAChecked = false;
          this.IsBChecked = false;
          this.IsCChecked = false;
          this.IsDChecked = false;
          if (element.answerSubmitted !== null) {
            let checkBoxOptions = element.answerSubmitted
              .split("(")
              .join("")
              .split(")")
              .join("")
              .split(",");
            checkBoxOptions.forEach((checkedOption) => {
              this.assignMSQOptionsChecked(checkedOption);
            });
          }
        } else {
          this.currentOption = element.answerSubmitted;
          if (this.questiontoShow.questionType === "NAT") {
            localStorage.setItem(this.localStorageNATKey, this.currentOption);
          }
        }
        assignedCurrentOption = true;
      } else {
        missedOutOnCurrentOption = true;
      }
    });

    if (!assignedCurrentOption && missedOutOnCurrentOption) {
      form.reset();
    }

    this.start = new Date().getTime();
    this.count++;

    this.calculateTotalCount();

    if (!assignedCurrentOption && this.examStatus === "PENDING") {
      if (this.questiontoShow.answerSubmitted !== null) {
        this.assignPreviouslySubmittedAnswer(
          this.questiontoShow.answerSubmitted
        );
      }
    }
  }

  markforreviewfun(form: NgForm, quesId: number, quesType: string) {
    this.end = new Date().getTime();
    let submittedTextValue = "natNotSelected";
    if (localStorage.getItem("natActiveValue") !== "") {
      this.natInput = localStorage.getItem("natActiveValue");
    } else if (localStorage.getItem(this.localStorageNATKey) !== "") {
      this.natInput = localStorage.getItem(this.localStorageNATKey);
    } else if (
      localStorage.getItem("natActiveValue") === "" &&
      localStorage.getItem(this.localStorageNATKey) === ""
    ) {
      this.natInput = "";
    }
    if (quesType === "NAT") {
      submittedTextValue = this.natInput;
    }
    if (quesType === "MCQ" || quesType === "NAT") {
      this.finalCheckedValue = true;
    }

    if (quesType === "MSQ") {
      if (this.totalOptionsChecked === "") {
        this.answerDataofUser.forEach((element, index) => {
          if (element.questionId === this.questiontoShow.id) {
            this.finalCheckedValue = true;
            this.totalOptionsChecked = element.answerSubmitted;
          }
        });
      }
    }

    if (
      form.value.optionSelected === "" ||
      form.value.optionSelected === null ||
      submittedTextValue === "" ||
      this.finalCheckedValue === false
    ) {
      let selectedValue = form.value.optionSelected;
      this.finalCheckedValue = false;
      if (quesType === "NAT") {
        selectedValue = null;
      }

      if (quesType === "MSQ") {
        this.totalOptionsChecked = "";
        selectedValue = null;
      }

      this.pushToArray(
        this.answerDataofUser,
        {
          questionId: quesId,
          questionStatus: "MARK_NOANS",
          answerSubmitted: selectedValue,
          timetaken: this.end - this.start,
        },
        false,
        false
      );

      this.savetheanswer(
        selectedValue,
        quesId,
        "MARK_NOANS",
        this.end - this.start
      );
    } else {
      let selectedValue = form.value.optionSelected;

      if (quesType === "MCQ") {
        this.finalCheckedValue = false;
      }

      if (quesType === "NAT") {
        selectedValue = submittedTextValue;
        this.finalCheckedValue = false;
        localStorage.setItem(this.localStorageNATKey, selectedValue);
        localStorage.setItem("natActiveValue", "");
      }

      if (quesType === "MSQ") {
        let listOfCheckedValues = "(";
        if (this.IsAChecked) {
          listOfCheckedValues = listOfCheckedValues + "A,";
        }
        if (this.IsBChecked) {
          listOfCheckedValues = listOfCheckedValues + "B,";
        }
        if (this.IsCChecked) {
          listOfCheckedValues = listOfCheckedValues + "C,";
        }
        if (this.IsDChecked) {
          listOfCheckedValues = listOfCheckedValues + "D,";
        }
        listOfCheckedValues =
          listOfCheckedValues.substring(0, listOfCheckedValues.length - 1) +
          ")";
        selectedValue = listOfCheckedValues;
        this.finalCheckedValue = false;
        this.totalOptionsChecked = "";
      }

      this.pushToArray(
        this.answerDataofUser,
        {
          questionId: quesId,
          questionStatus: "MARK_ANS",
          answerSubmitted: selectedValue,
          timetaken: this.end - this.start,
        },
        false,
        false
      );

      this.savetheanswer(
        selectedValue,
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

    let assignedCurrentOption = false;
    let missedOutOnCurrentOption = false;
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        if (this.questiontoShow.questionType === "MSQ") {
          this.IsAChecked = false;
          this.IsBChecked = false;
          this.IsCChecked = false;
          this.IsDChecked = false;
          if (element.answerSubmitted !== null) {
            let checkBoxOptions = element.answerSubmitted
              .split("(")
              .join("")
              .split(")")
              .join("")
              .split(",");
            checkBoxOptions.forEach((checkedOption) => {
              this.assignMSQOptionsChecked(checkedOption);
            });
          }
        } else {
          this.currentOption = element.answerSubmitted;
          if (this.questiontoShow.questionType === "NAT") {
            localStorage.setItem(this.localStorageNATKey, this.currentOption);
          }
        }
        assignedCurrentOption = true;
      } else {
        missedOutOnCurrentOption = true;
      }
    });

    if (!assignedCurrentOption && missedOutOnCurrentOption) {
      form.reset();
    }

    this.count++;
    this.start = new Date().getTime();
    this.calculateTotalCount();
    if (!assignedCurrentOption && this.examStatus === "PENDING") {
      if (this.questiontoShow.answerSubmitted !== null) {
        this.assignPreviouslySubmittedAnswer(
          this.questiontoShow.answerSubmitted
        );
      }
    }
  }

  timesUp(event) {
    if (
      event["action"] === "done" &&
      event["left"] === 0 &&
      event["status"] === 3
    ) {
      this.submittheanswer(true);
    }
  }

  clearResponse(form: NgForm, quesId: number, quesType: string) {
    if (quesType === "NAT") {
      this.currentOption = "";
    }

    if (quesType === "MSQ") {
      this.IsAChecked = false;
      this.IsBChecked = false;
      this.IsCChecked = false;
      this.IsDChecked = false;
      this.finalCheckedValue = false;
    }

    form.reset();
    localStorage.setItem("natActiveValue", "");
    this.pushToArray(
      this.answerDataofUser,
      {
        questionId: quesId,
        questionStatus: "NO_ANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: "4",
      },
      false,
      false
    );

    this.calculateTotalCount();
  }

  assignPreviouslySubmittedAnswer(alreadySubmittedAnswer: any) {
    switch (this.questiontoShow.questionType) {
      case "MCQ":
        this.currentOption = alreadySubmittedAnswer;
        break;
      case "MSQ":
        this.IsAChecked = false;
        this.IsBChecked = false;
        this.IsCChecked = false;
        this.IsDChecked = false;
        let checkBoxOptions = alreadySubmittedAnswer
          .split("(")
          .join("")
          .split(")")
          .join("")
          .split(",");
        checkBoxOptions.forEach((checkedOption) => {
          this.assignMSQOptionsChecked(checkedOption);
        });
        break;
      case "NAT":
        this.currentOption = alreadySubmittedAnswer;
        localStorage.setItem(this.localStorageNATKey, this.currentOption);
        break;
    }
  }

  pushToArray(arr, obj, checkIfTabChanged, setInitialCountWhileResumed) {
    var existingIds = arr.map((obj) => obj.questionId);

    if (setInitialCountWhileResumed) {
      arr.push(obj);
    } else if (!existingIds.includes(obj.questionId)) {
      arr.push(obj);

      if (this.notVisitedCount !== 0) {
        [...this.question[this.sect]][0][this.sectionnotvisitedCount] =
          [...this.question[this.sect]][0][this.sectionnotvisitedCount] - 1;
        this.notVisitedCount = [...this.question[this.sect]][0][
          this.sectionnotvisitedCount
        ];
      }

      this.methodToManipulateTheCount(obj.questionStatus, 1);
    } else {
      arr.forEach((element, index) => {
        if (element.questionId === obj.questionId) {
          obj.timetaken += element.timetaken;
          arr[index] = obj;
          if (!checkIfTabChanged) {
            this.methodToManipulateTheCount(element.questionStatus, -1);
            this.methodToManipulateTheCount(obj.questionStatus, 1);
          }
        }
      });
    }
  }

  methodToManipulateTheCount(status: string, count: number) {
    switch (status) {
      case "ANS":
        [...this.question[this.sect]][0][this.sectionansweredCount] =
          count === -1
            ? this.answeredCount !== 0
              ? [...this.question[this.sect]][0][this.sectionansweredCount] +
                count
              : this.answeredCount
            : [...this.question[this.sect]][0][this.sectionansweredCount] +
              count;
        this.answeredCount = [...this.question[this.sect]][0][
          this.sectionansweredCount
        ];
        break;
      case "NO_ANS":
        [...this.question[this.sect]][0][this.sectionnotAnsweredCount] =
          count === -1
            ? this.notAnsweredCount !== 0
              ? [...this.question[this.sect]][0][this.sectionnotAnsweredCount] +
                count
              : this.notAnsweredCount
            : [...this.question[this.sect]][0][this.sectionnotAnsweredCount] +
              count;
        this.notAnsweredCount = [...this.question[this.sect]][0][
          this.sectionnotAnsweredCount
        ];
        break;
      case "MARK_ANS":
        [...this.question[this.sect]][0][
          this.sectionmarkedForReviewWithAnswerCount
        ] =
          count === -1
            ? this.markedForReviewWithAnswerCount !== 0
              ? [...this.question[this.sect]][0][
                  this.sectionmarkedForReviewWithAnswerCount
                ] + count
              : this.markedForReviewWithAnswerCount
            : [...this.question[this.sect]][0][
                this.sectionmarkedForReviewWithAnswerCount
              ] + count;
        this.markedForReviewWithAnswerCount = [...this.question[this.sect]][0][
          this.sectionmarkedForReviewWithAnswerCount
        ];
        break;
      case "MARK_NOANS":
        [...this.question[this.sect]][0][this.sectionmarkedForReviewCount] =
          count === -1
            ? this.markedForReviewCount !== 0
              ? [...this.question[this.sect]][0][
                  this.sectionmarkedForReviewCount
                ] + count
              : this.markedForReviewCount
            : [...this.question[this.sect]][0][
                this.sectionmarkedForReviewCount
              ] + count;
        this.markedForReviewCount = [...this.question[this.sect]][0][
          this.sectionmarkedForReviewCount
        ];
        break;
    }
  }

  sidebuttonforquestion(position: number, prevquestion: any, quesType: string) {
    this.questiontoShow = {
      ...this.questionGroup[position - 1],
    };

    var t: string;
    var r: string;
    if (prevquestion !== undefined) {
      this.end = new Date().getTime();
      this.answerDataofUser.forEach((element, index) => {
        if (element.questionId === prevquestion["id"]) {
          t = element.answerSubmitted;
          r = element.questionStatus;
        }
      });

      this.pushToArray(
        this.answerDataofUser,
        {
          questionId: prevquestion["id"],
          timetaken: this.end - this.start,
          answerSubmitted: t === undefined ? null : t,
          questionStatus: r === undefined ? "NO_ANS" : r,
        },
        true,
        false
      );

      this.savetheanswer(
        t === undefined ? null : t,
        prevquestion["id"],
        r === undefined ? "NO_ANS" : r,
        this.end - this.start
      );

    }

    let assignedCurrentOption = false;
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        if (this.questiontoShow.questionType === "MSQ") {
          this.IsAChecked = false;
          this.IsBChecked = false;
          this.IsCChecked = false;
          this.IsDChecked = false;
          if (element.answerSubmitted !== null) {
            let checkBoxOptions = element.answerSubmitted
              .split("(")
              .join("")
              .split(")")
              .join("")
              .split(",");
            checkBoxOptions.forEach((checkedOption) => {
              this.assignMSQOptionsChecked(checkedOption);
            });
          }
        } else {
          this.currentOption = element.answerSubmitted;
        }
        assignedCurrentOption = true;
      }
    });
    this.count = position;
    this.start = new Date().getTime();
    this.calculateTotalCount();
    if (!assignedCurrentOption && this.examStatus === "PENDING") {
      if (this.questiontoShow.answerSubmitted !== null) {
        this.assignPreviouslySubmittedAnswer(
          this.questiontoShow.answerSubmitted
        );
      }
    }
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

  calculateTotalCount() {
    this.totalNotVisitedCount = 0;
    this.totalMarkedForReviewCount = 0;
    this.totalMarkedForReviewWithAnswerCount = 0;
    this.totalAnsweredCount = 0;
    this.totalNotAnsweredCount = 0;

    Object.keys(this.question).forEach((key) => {
      let questionKey = [...this.question[key]][0];

      this.totalAnsweredCount =
        questionKey[this.sectionansweredCount] !== undefined
          ? this.totalAnsweredCount + questionKey[this.sectionansweredCount]
          : this.totalAnsweredCount;
      this.totalNotAnsweredCount =
        questionKey[this.sectionnotAnsweredCount] !== undefined
          ? this.totalNotAnsweredCount +
            questionKey[this.sectionnotAnsweredCount]
          : this.totalNotAnsweredCount;
      this.totalMarkedForReviewCount =
        questionKey[this.sectionmarkedForReviewCount] !== undefined
          ? this.totalMarkedForReviewCount +
            questionKey[this.sectionmarkedForReviewCount]
          : this.totalMarkedForReviewCount;
      this.totalMarkedForReviewWithAnswerCount =
        questionKey[this.sectionmarkedForReviewWithAnswerCount] !== undefined
          ? this.totalMarkedForReviewWithAnswerCount +
            questionKey[this.sectionmarkedForReviewWithAnswerCount]
          : this.totalMarkedForReviewWithAnswerCount;
      this.totalNotVisitedCount =
        questionKey[this.sectionnotvisitedCount] !== undefined
          ? this.totalNotVisitedCount + questionKey[this.sectionnotvisitedCount]
          : this.totalNotVisitedCount;
    });
  }

  submittheanswer(exam_over: boolean) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to end the Exam!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (exam_over) {
          let endingTime = new Date().getTime();
          let totalTimeTaken = endingTime - this.startingTime;
          this.quesService
            .postSubmittedAnswer({
              courseId: +this.courseId,
              status: "COMPLETED",
              totalTime: totalTimeTaken.toString(),
              userId: +this.userId,
            })
            .subscribe(
              (data) => {
                window.close();
                window.opener.location.reload();
              },
              (err) => {
                console.log(err);
                window.close();
                window.opener.location.reload();
              }
            );
        }
      }
    });
  }
}

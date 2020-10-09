import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  OnDestroy,
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
  notVisitedCount:number;
  markedForReviewCount:number=0;
  markedForReviewWithAnswerCount:number=0;
  answeredCount:number=0;
  notAnsweredCount:number=1;
  sectionansweredCount:string;
  sectionnotAnsweredCount:string;
  sectionmarkedForReviewCount:string;
  sectionmarkedForReviewWithAnswerCount:string;
  sectionnotvisitedCount:string;
  sect:string;
  startingTime = new Date().getTime();
  //constructor
  constructor(
    private quesService: QuestionsService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
    private timerService: TimerService,
    private router: Router
  ) {
    this.gridContainer = document.getElementsByClassName("grid-container");
  }

  //ngOninit
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.test_code = params["test_id"];
    });
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      this.email = data.user.emailId;
      this.name = data.user.name;
      this.userId= data.user.id;

      this.quesService
        .getQuestionsForTestSeries(this.test_code)
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
  }

  getStyles(group: any): any {
    let myStyles= {
      'background':"url('questions-sprite.png') no-repeat",
      'color': 'white',
      'background-position': '-157px -4px',
      'padding':'8px',
      'height':'48px'
    }
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === group.id) {
        let finalPosition = this.finalPosition(element.questionStatus);
        myStyles= {
          'background':"url('questions-sprite.png') no-repeat",
          'color': 'white',
          'background-position': finalPosition,
          'padding':'8px',
          'height':'48px'
        }
      }
    });
    return myStyles;
  }

  finalPosition(status: String): string {
    switch (status) {
      case "ANS":
        return '-4px -126px';
      case "NO_ANS":
        return '-57px -6px';
      case "MARK_ANS":
        return '-66px -178px';
      case "MARK_NOANS":
        return '-108px -1px';
      default:
        return '-157px -4px';
    }
  }

  selectedTab(event: MatTabChangeEvent, prevquestion: any,form: NgForm) {
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

      this.pushToArray(this.answerDataofUser, {
        questionId: prevquestion["id"],
        timetaken: this.end - this.start,
        answerSubmitted: t === undefined ? null : t,
        questionStatus: r === undefined ? "NO_ANS" : r,
      },true);
    }
    this.selectedTabCurrent = event.tab.textLabel;
    this.sect = event.tab.textLabel;
    this.duration = [...this.question[this.sect]][0]["courseId"]["duration"];
    this.test_title = [...this.question[this.sect]][0]["courseId"]["title"];
    this.courseId = [...this.question[this.sect]][0]["courseId"]["id"];
    
    
    this.sectionnotvisitedCount=this.sect+"notvisitedCount";
    this.sectionansweredCount=this.sect+"answeredCount";
    this.sectionnotAnsweredCount=this.sect+"notAnsweredCount";
    this.sectionmarkedForReviewCount=this.sect+"markedForReviewCount";
    this.sectionmarkedForReviewWithAnswerCount=this.sect+"markedForReviewWithAnswerCount";
 
    [...this.question[this.sect]][0][this.sectionansweredCount]=[...this.question[this.sect]][0][this.sectionansweredCount] === undefined?0:[...this.question[this.sect]][0][this.sectionansweredCount];
    [...this.question[this.sect]][0][this.sectionnotAnsweredCount]=[...this.question[this.sect]][0][this.sectionnotAnsweredCount] === undefined?0:[...this.question[this.sect]][0][this.sectionnotAnsweredCount];
    [...this.question[this.sect]][0][this.sectionmarkedForReviewCount]=[...this.question[this.sect]][0][this.sectionmarkedForReviewCount] === undefined?0:[...this.question[this.sect]][0][this.sectionmarkedForReviewCount];
    [...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount]=[...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount] === undefined?0:[...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount];
    [...this.question[this.sect]][0][this.sectionnotvisitedCount]=[...this.question[this.sect]][0][this.sectionnotvisitedCount] === undefined?[...this.question[this.sect]].length:[...this.question[this.sect]][0][this.sectionnotvisitedCount];
    
    this.answeredCount=[...this.question[this.sect]][0][this.sectionansweredCount];
    this.notAnsweredCount=[...this.question[this.sect]][0][this.sectionnotAnsweredCount];
    this.markedForReviewCount=[...this.question[this.sect]][0][this.sectionmarkedForReviewCount];
    this.markedForReviewWithAnswerCount=[...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount];
    this.notVisitedCount=[...this.question[this.sect]][0][this.sectionnotvisitedCount];

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

    let assignedCurrentOption=false;
    let missedOutOnCurrentOption=false;
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        this.currentOption = element.answerSubmitted;
        assignedCurrentOption=true;
      } else{
        missedOutOnCurrentOption=true;
      }
    });
    
    if(!assignedCurrentOption && missedOutOnCurrentOption){
     form.reset();
    }
  }
  start: any;
  end: any;

  questiontodisplayincrement(form: NgForm, quesId: number) {
    this.end = new Date().getTime();
    if (
      form.value.optionSelected === "z" ||
      form.value.optionSelected === null
    ) {
      this.pushToArray(this.answerDataofUser, {
        questionId: quesId,
        questionStatus: "NO_ANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      },false);
     
      this.savetheanswer(form.value.optionSelected,quesId,"NO_ANS",this.end - this.start); 
    } else {
      this.pushToArray(this.answerDataofUser, {
        questionId: quesId,
        questionStatus: "ANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      },false);

    
      this.savetheanswer(form.value.optionSelected,quesId,"ANS",this.end - this.start); 
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

    let assignedCurrentOption=false;
    let missedOutOnCurrentOption=false;
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        this.currentOption = element.answerSubmitted;
        assignedCurrentOption=true;
      } else{
        missedOutOnCurrentOption=true;
      }
    });
    
    if(!assignedCurrentOption && missedOutOnCurrentOption){
      form.reset();
    }
    
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
        questionStatus: "MARK_NOANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      },false);

      this.savetheanswer(form.value.optionSelected,quesId,"MARK_NOANS",this.end - this.start); 
    } else {
      this.pushToArray(this.answerDataofUser, {
        questionId: quesId,
        questionStatus: "MARK_ANS",
        answerSubmitted: form.value.optionSelected,
        timetaken: this.end - this.start,
      },false);

      this.savetheanswer(form.value.optionSelected,quesId,"MARK_ANS",this.end - this.start); 
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

    let assignedCurrentOption=false;
    let missedOutOnCurrentOption=false;
    this.answerDataofUser.forEach((element, index) => {
      if (element.questionId === this.questiontoShow.id) {
        this.currentOption = element.answerSubmitted;
        assignedCurrentOption=true;
      } else{
        missedOutOnCurrentOption=true;
      }
    });

    if(!assignedCurrentOption && missedOutOnCurrentOption){
      form.reset();
    }

    this.count++;
    this.start = new Date().getTime();
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

  clearResponse(form: NgForm, quesId: number) {
    form.reset();
    this.pushToArray(this.answerDataofUser, {
      questionId: quesId,
      questionStatus: "NO_ANS",
      answerSubmitted: form.value.optionSelected,
      timetaken: "4",
    },false);
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
  pushToArray(arr, obj,checkIfTabChanged) {
    var existingIds = arr.map((obj) => obj.questionId);

    if (!existingIds.includes(obj.questionId)) {
      arr.push(obj);

      if(this.notVisitedCount !== 0){
        [...this.question[this.sect]][0][this.sectionnotvisitedCount]=[...this.question[this.sect]][0][this.sectionnotvisitedCount]-1;
        this.notVisitedCount=[...this.question[this.sect]][0][this.sectionnotvisitedCount];
      }

      this.methodToManipulateTheCount(obj.questionStatus,1);
    } else {
      arr.forEach((element, index) => {
        if (element.questionId === obj.questionId) {
          obj.timetaken += element.timetaken;
          arr[index] = obj;
          if(!checkIfTabChanged){
            this.methodToManipulateTheCount(element.questionStatus,-1);
            this.methodToManipulateTheCount(obj.questionStatus,1); 
          }
        }
      });
    }
  }

  methodToManipulateTheCount(status:string,count:number){
    switch (status) {
      case "ANS":
        [...this.question[this.sect]][0][this.sectionansweredCount] = (count === -1) ?(this.answeredCount !== 0 ? [...this.question[this.sect]][0][this.sectionansweredCount]+count:this.answeredCount):[...this.question[this.sect]][0][this.sectionansweredCount]+count;
        this.answeredCount=[...this.question[this.sect]][0][this.sectionansweredCount];
        break;
      case "NO_ANS":
        [...this.question[this.sect]][0][this.sectionnotAnsweredCount] = (count === -1) ?(this.notAnsweredCount !== 0 ? [...this.question[this.sect]][0][this.sectionnotAnsweredCount]+count:this.notAnsweredCount):[...this.question[this.sect]][0][this.sectionnotAnsweredCount]+count;
        this.notAnsweredCount=[...this.question[this.sect]][0][this.sectionnotAnsweredCount];
        break;
      case "MARK_ANS":
        [...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount] = (count === -1) ?(this.markedForReviewWithAnswerCount !== 0 ? [...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount]+count:this.markedForReviewWithAnswerCount):[...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount]+count;
        this.markedForReviewWithAnswerCount=[...this.question[this.sect]][0][this.sectionmarkedForReviewWithAnswerCount];
        break;
      case "MARK_NOANS":
        [...this.question[this.sect]][0][this.sectionmarkedForReviewCount] = (count === -1) ?(this.markedForReviewCount !== 0 ? [...this.question[this.sect]][0][this.sectionmarkedForReviewCount]+count:this.markedForReviewCount):[...this.question[this.sect]][0][this.sectionmarkedForReviewCount]+count;
        this.markedForReviewCount=[...this.question[this.sect]][0][this.sectionmarkedForReviewCount];
        break;
    }
  }

  sidebuttonforquestion(position: number, prevquestion: any) {
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

      this.pushToArray(this.answerDataofUser, {
        questionId: prevquestion["id"],
        timetaken: this.end - this.start,
        answerSubmitted: t === undefined ? null : t,
        questionStatus: r === undefined ? "NO_ANS" : r,
      },true);
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

  savetheanswer(answerSubmitted:string,questionId:number,questionStatus:string,timeTaken:number) {
      this.quesService
        .postSavedAnswer({
          answerSubmitted: answerSubmitted,
          courseId: +this.courseId,
          questionId: questionId,
          questionStatus: questionStatus,
          timeTaken: timeTaken,
          userId: +this.userId
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
      let endingTime = new Date().getTime();
      let totalTimeTaken= endingTime - this.startingTime;
      this.quesService
        .postSubmittedAnswer({
          courseId: +this.courseId,
          status: "COMPLETED",
          totalTime: totalTimeTaken.toString(),
          userId: +this.userId
        })
        .subscribe(
          (data) => {
            myWindow.close();
          },
          (err) => {
            console.log(err);
            myWindow.close();
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

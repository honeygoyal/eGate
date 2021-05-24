import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Useranswer } from 'src/app/exampanel/model/Useranswer.model';
import { AppState } from 'src/app/reducers';
import "./../../../../assets/virtual_keyboard.js";
import { GetquestionforquesbankService } from '../../services/getquestionforquesbank.service';

@Component({
  selector: 'app-questionbankpanelscreen',
  templateUrl: './questionbankpanelscreen.component.html',
  styleUrls: ['./questionbankpanelscreen.component.scss']
})
export class QuestionbankpanelscreenComponent implements OnInit {
  email:string;
  name:string;
  userId:Number;
  profilePhoto:string;
  test_code:string;
  currentOption = "";
  count = 1;
  showQuestionLookup=false;
  answerDataofUser: Useranswer[] = [];
  loader:boolean;
  question:any;
  questionGroup:any;
  questiontoShow:any;


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
  totalCollectionLength:number=0;
  constructor( private quesService: GetquestionforquesbankService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
    private router: Router,) { }

  ngOnInit(): void {
    window.onunload = refreshParent;
    function refreshParent() {
        window.opener.location.reload();
    }
    this.route.params.subscribe((params: Params) => {
      this.test_code = params["test_id"];
    });
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      this.email = data.user.emailId;
      this.name = data.user.name;
      this.userId = data.user.id;
      this.profilePhoto = data.user.photo;
      this.loader=true;
      this.quesService
        .getQuestionsForQuestionBank(this.test_code, this.userId)
        .subscribe((data) => {
          console.log(data);
          this.question = data;
          
          this.loader=false;
          this.showQuestionLookup=true;
        }, (err)=>{
          this.loader=false;
          window.close();
        });

    });
    
  }

  sect:string;

  selectedTabCurrent:string
  selectedTab(event: MatTabChangeEvent, prevquestion: any) {
    
    this.selectedTabCurrent = event.tab.textLabel;
    this.sect = event.tab.textLabel;
    this.questionGroup = [...this.question[this.sect]];
    this.questiontoShow = {
      ...this.questionGroup[0],
    };
    this.totalCollectionLength=this.questionGroup.length;

    console.log(this.questionGroup);
  }

  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }


  pushToArray(arr, obj) {
      var existingIds = arr.map((obj) => obj.questionId);
      arr.push(obj);
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

  sidebuttonforquestion(position: number, prevquestion: any, quesType: string) {
    this.showanswer=false;
    this.attemptedAnswer=[false,false,false,false];
    this.questiontoShow = {
      ...this.questionGroup[position - 1],
    };
    
    this.correctanswer="";
    var t: string;
    var r: string;
    if (prevquestion !== undefined) {
      this.answerDataofUser.forEach((element, index) => {
        if (element.questionId === prevquestion["id"]) {
          t = element.answerSubmitted;
          r = element.questionStatus;
        }
      });
    }

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
          let ansSub="";
          if(element.answerSubmitted === "null"  || element.answerSubmitted === null){
             ansSub="null";
          }
          if(ansSub !== "null") {
            if (this.questiontoShow.questionType === "NAT") {
              localStorage.setItem(this.localStorageNATKey, element.answerSubmitted);
              this.currentOption = element.answerSubmitted;
            }else{
              this.currentOption = element.answerSubmitted;
            }
          }else{
            if (this.questiontoShow.questionType === "NAT") {
              localStorage.setItem(this.localStorageNATKey, "");
              localStorage.setItem("natActiveValue", "");
              this.currentOption = "";
              (<HTMLInputElement>document.getElementById("answer")).value="";
            }else{
              this.currentOption = element.answerSubmitted;
            }
          }
        }
       
        assignedCurrentOption = true;
      } else {
        missedOutOnCurrentOption = true;
      }
    });

    if (!assignedCurrentOption && missedOutOnCurrentOption) {
      if (this.questiontoShow.questionType === "NAT") {
        this.currentOption="";
        (<HTMLInputElement>document.getElementById("answer")).value="";
        //localStorage.setItem("natActiveValue", "");
      }else if (this.questiontoShow.questionType === "MSQ") {
        this.IsAChecked=false;
        this.IsBChecked=false;
        this.IsCChecked=false;
        this.IsDChecked=false;
      }
      else{
        this.currentOption=null;
      }
    }

    this.count = position;
  }

  onMSQChange($event, passedOption) {
    switch (passedOption) {
      case "A":
        this.IsAChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
        this.attemptedAnswer[0]=true;
        break;
      case "B":
        this.IsBChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
        this.attemptedAnswer[1]=true;
        break;
      case "C":
        this.IsCChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
          this.attemptedAnswer[2]=true;
        break;
      case "D":
        this.IsDChecked = $event.checked;
        this.finalCheckedValue = true;
        this.totalOptionsChecked =
          this.totalOptionsChecked + passedOption + ",";
        this.attemptedAnswer[3]=true;
        break;
    }
  }

  nextQuestion(form: NgForm, quesId: number, quesType: string){
    this.showanswer=false;
    this.attemptedAnswer=[false,false,false,false];
    this.count=quesId+1;
    this.questiontoShow = {
      ...this.questionGroup[quesId],
    };
    this.correctanswer="";
    form.reset();
    if (quesType === "MSQ") {
      if (this.IsAChecked) {
        this.IsAChecked=false;
      }
      if (this.IsBChecked) {
        this.IsBChecked=false;
      }
      if (this.IsCChecked) {
        this.IsCChecked=false;
      }
      if (this.IsDChecked) {
        this.IsDChecked=false;
      }
    }

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
          let ansSub="";
          if(element.answerSubmitted === "null"  || element.answerSubmitted === null){
             ansSub="null";
          }
          if(ansSub !== "null") {
            if (this.questiontoShow.questionType === "NAT") {
              localStorage.setItem(this.localStorageNATKey, element.answerSubmitted);
              this.currentOption = element.answerSubmitted;
            }else{
              this.currentOption = element.answerSubmitted;
            }
          }else{
            if (this.questiontoShow.questionType === "NAT") {
              localStorage.setItem(this.localStorageNATKey, "");
              localStorage.setItem("natActiveValue", "");
              this.currentOption = "";
              (<HTMLInputElement>document.getElementById("answer")).value="";
            }else{
              this.currentOption = element.answerSubmitted;
            }
          }
        }
       
      } 
    });
  }
  
  showanswer:boolean=false;
  correctanswer:string="";
  attemptedAnswer:boolean[]=[false,false,false,false];
  
  
  showAnswer(form: NgForm, quesId: number, quesType: string) {
    this.showanswer=true;
    console.log(form);
    console.log(quesId);
    console.log(quesType);
    console.log(this.showAnswer);
  
    this.correctanswer=this.questiontoShow.answer;
  
    
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
      let replaceString=this.questiontoShow.answer.replace('(','').replace(')','');
      let finalstring=replaceString.split(',');
      if(submittedTextValue >= finalstring[0].trim() || submittedTextValue <= finalstring[1].trim()){
        this.correctanswer="true";
      }
      this.finalCheckedValue = true;
    }
    if (quesType === "MCQ" ) {
      this.attemptedAnswer=[false,false,false,false];
      this.finalCheckedValue = true;
      switch (form.value.optionSelected) {
        case 'A':
          this.attemptedAnswer[0]=true;

          break;
        case 'B':
          this.attemptedAnswer[1]=true;
          break;
        case 'C':
          this.attemptedAnswer[2]=true;
          break;
        case 'D':
          this.attemptedAnswer[3]=true;
          break;
      }
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
        selectedValue = "";
      }

      if (quesType === "MSQ") {
        this.totalOptionsChecked = "";
        selectedValue = null;
      }

      this.pushToArray(
        this.answerDataofUser,
        {
          questionId: quesId,
          questionType: quesType,
          answerSubmitted: selectedValue
        }
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
        questionType: quesType,
        answerSubmitted: selectedValue
      }
    );
  }
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


}

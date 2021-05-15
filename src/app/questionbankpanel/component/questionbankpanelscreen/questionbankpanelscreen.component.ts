import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Useranswer } from 'src/app/exampanel/model/Useranswer.model';
import { AppState } from 'src/app/reducers';
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
  
  count = 1;
  answerDataofUser: Useranswer[] = [];
  loader:boolean;
  question:any;
  questionGroup:any;
  questiontoShow:any;
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
    
    console.log(this.questionGroup);
  }

  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
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
    this.questiontoShow = {
      ...this.questionGroup[position - 1],
    };

    this.count = position;
  }
  showanswer:boolean=false;
  selectAnswer:boolean[]=[false,false,false,false];
  showAnswer(form: NgForm, quesId: number, quesType: string) {
    this.showanswer=true;
    console.log(form);
    console.log(quesId);
    console.log(quesType);
    console.log(this.showAnswer);
    
  }

  nextQuestion(){
    this.questiontoShow = {
      ...this.questionGroup[this.count-1]
    }
  }
}

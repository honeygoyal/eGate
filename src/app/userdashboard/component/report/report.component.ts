import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
  test_id:string
  user:any;
  constructor(private http:HttpClient,private route: ActivatedRoute,private sanitizer: DomSanitizer) { }
  questionanalysis:any;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.test_id = params["test_id"];
    });
    this.user=JSON.parse(localStorage.getItem("user"))
    this.http.get("http://localhost:8080/reportOverall/getTopRank?course_id="+this.test_id).subscribe((data)=>{
      console.log(data)
    })
    this.http.get("http://localhost:8080/reportDetail/getQuestionAnalysis?user_id="+this.user.user.id+"&course_id="+this.test_id).subscribe((data)=>{
      
      this.questionanalysis=data;
      console.log("Question Analysis",this.questionanalysis);
    })
  }

  
  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  getColor(difficulty){
    switch(difficulty){
      case 'MEDIUM':
        return '#ed7d31';
      case 'HARD':
        return '#ff0000';
      case 'EASY':
        return '#00b050';
    }
  }

}

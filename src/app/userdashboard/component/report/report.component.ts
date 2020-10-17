import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from "sweetalert2";
declare let Email: any;
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
  userrankdata:any;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.test_id = params["test_id"];
    });
    this.user=JSON.parse(localStorage.getItem("user"))
    this.http.get("http://localhost:8080/reportOverall/getTopRank?course_id="+this.test_id).subscribe((data)=>{
      console.log(data)
      this.userrankdata=data;
    })
    this.http.get("http://localhost:8080/reportDetail/getQuestionAnalysis?user_id="+this.user.user.id+"&course_id="+this.test_id).subscribe((data)=>{
      
      this.questionanalysis=data;
      console.log("Question Analysis",this.questionanalysis);
    })
  }
 filename:any;
 filepath:any;
  onSubmit(f: NgForm){
    // this.filepath=f.value.attachments;
  //  this.filename=this.filepath.replace(/^.*[\\\/]/, '')
    this.filename=(<HTMLInputElement>document.getElementById("file-id")).files[0].name;
   this.filepath=(<HTMLInputElement>document.getElementById("file-id")).files[0];
    console.log("filename",this.filename);
    console.log("filepath",this.filepath);
    Email.send({
      Host: "smtpout.asia.secureserver.net",
      Username: "support@egatetutor.in",
      Password: "egatetutor_2019",
      To: "support@egatetutor.in,himanshup6201@gmail.com",
      From: "support@egatetutor.in",
      Subject: "Mail sent from: " + this.user.emailId,
      Body: `
      <b>Message:</b>  ${f.value.message}<br />  `,
      Attachments: [ 
        { 
          name: this.filename, 
          // path:"https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png",  
          // path:"C:/Users/himan/OneDrive/Desktop/smtpjs.png",  
          path:"file:///C:/Users/himan/OneDrive/Desktop/smtpjs.png",  
          // name : "smtpjs.png",
  	    	// path:"https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
        }] 
    }).then((message) => {
      Swal.fire("Message Sent!");
      f.resetForm();
    });
  }
  handleUpload(e){
    this.filepath=e.target.value;
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

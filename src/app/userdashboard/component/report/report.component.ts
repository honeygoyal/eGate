import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";
import { forkJoin } from 'rxjs';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
declare let Email: any;
@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReportComponent implements OnInit {
  title = "Your Test Performance";
  type = "PieChart";
  data: any[];

  columnNames = ["Answer_Status", "percentage"];
  options = {
    colors: ["green", "red", "#ef873b"],
    pieHole: 0.5,
  };
  width = 425;
  height = 300;
  hist_title = "Test Analysis";
  hist_type = "ColumnChart";
  hist_data: any[] = [];
show:boolean=false;
  hist_columnNames = ["Question Number", "Time(sec)"];
  hist_options = {};
  hist_width = 800;
  hist_height = 400;
  test_id: string;
  user: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  questionanalysis: any;
  userrankdata: any;
  testanalyticsdata: any;
  histogramdata: any[] = [];
  
  changeshow(i:number){
    this.show=true;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.test_id = params["test_id"];
    });
    this.user = JSON.parse(localStorage.getItem("user"));
  
    this.http
      .get(
        environment.getOverallReportByUserId +
          this.user.user.id +
          "&course_id=" +
          this.test_id
      )
      .subscribe((data) => {
        console.log(data);
        this.testanalyticsdata = data;
        this.data = [
          ["Correct", this.testanalyticsdata.correct],
          ["Incorrect", this.testanalyticsdata.inCorrect],
          ["Unattempt", this.testanalyticsdata.unAttempt],
        ];
       
      });
    this.http.get(environment.getTopRank + this.test_id).subscribe((data) => {
      console.log(data);
      this.userrankdata = data;
    });
  this.http
    .get(
      environment.getQuestionAnalysis +
        this.user.user.id +
        "&course_id=" +
        this.test_id
    )
    .subscribe((data) => {
      let i = 1;
      this.questionanalysis = data;
      this.questionanalysis.forEach((element) => {
        this.hist_data.push([i, element.yourTime / 1000]);
        i++;
      });
    });
   
  }
  onSubmit(f: NgForm) {
    Email.send({
      Host: "smtpout.asia.secureserver.net",
      Username: "support@egatetutor.in",
      Password: "egatetutor_2019",
      To: "support@egatetutor.in,himanshup6201@gmail.com",
      From: "support@egatetutor.in",
      Subject: "Mail sent from: " + this.user.emailId,
      Body: `
      <b>Message:</b>  ${f.value.message}<br />  `,
    }).then((message) => {
      Swal.fire("Message Sent!");
      f.resetForm();
    });
  }

  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  getColor(difficulty) {
    switch (difficulty) {
      case "MEDIUM":
        return "#ed7d31";
      case "HARD":
        return "#ff0000";
      case "EASY":
        return "#00b050";
    }
  }
}

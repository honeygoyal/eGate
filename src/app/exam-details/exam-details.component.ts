import { Component, OnInit, ElementRef } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: "app-exam-details",
  templateUrl: "./exam-details.component.html",
  styleUrls: ["./exam-details.component.scss"],
})
export class ExamDetailsComponent implements OnInit {
  panelOpenState = false;
  subjectSelected: string;
  psuCourse: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.subjectSelected = params["subject"];
    });
  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.subjectSelected = deviceValue;
  }
}

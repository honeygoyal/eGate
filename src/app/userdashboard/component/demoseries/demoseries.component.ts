import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-demoseries",
  templateUrl: "./demoseries.component.html",
  styleUrls: ["./demoseries.component.scss"],
})
export class DemoseriesComponent implements OnInit {
  constructor() {}
  colors: any[] = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff3333",
    "#ffff00",
    "#ff6600",
  ];
  pickColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  ngOnInit(): void {}

  exams: any[] = [
    {
      exam_name: "DemoTest1",
      exam_subheading: "Subheading Name",
      total_question: "17",
      total_marks: "20",
      duration: "20",
      content_type: "test",
    },
    {
      exam_name: "DemoTest2",
      exam_subheading: "Subheading Name1",
      total_question: "17",
      total_marks: "20",
      duration: "20",
      content_type: "video",
    },
    {
      exam_name: "DemoTest3",
      exam_subheading: "Subheading Name3",
      total_question: "17",
      total_marks: "20",
      duration: "20",
      content_type: "eseries",
    },
    {
      exam_name: "DemoTest4",
      exam_subheading: "Subheading Name4",
      total_question: "17",
      total_marks: "20",
      duration: "20",
      content_type: "test",
    },
    {
      exam_name: "DemoTest5",
      exam_subheading: "Subheading Name5",
      total_question: "17",
      total_marks: "20",
      duration: "20",
      content_type: "video",
    },
    {
      exam_name: "DemoTest5",
      exam_subheading: "Subheading Name5",
      total_question: "17",
      total_marks: "20",
      duration: "20",
      content_type: "video",
    },
  ];
}

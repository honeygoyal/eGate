import { Component, OnInit } from "@angular/core";

import Swal from "sweetalert2";
@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  soonUpdateMessage() {
    Swal.fire("Content soon to be Updated!");
  }
}

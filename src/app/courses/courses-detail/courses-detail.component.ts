import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import Swal from "sweetalert2";
@Component({
  selector: "app-courses-detail",
  templateUrl: "./courses-detail.component.html",
  styleUrls: ["./courses-detail.component.scss"],
})
export class CoursesDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  contentSelected: string;
  content: string;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.contentSelected = params["subject"];
      this.content = params["content"];
    });
  }

  paymentstart() {
    event.preventDefault();
    Swal.fire("Registration will start soon !!!");
  }
}

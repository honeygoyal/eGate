import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.scss"],
})
export class BodyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  soonUpdateMessage() {
    event.preventDefault();
    Swal.fire("Content soon to be updated!");
  }
  regtoopen() {
    Swal.fire("Registration will start soon!");
  }
}

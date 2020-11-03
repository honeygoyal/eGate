import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-demoseries",
  templateUrl: "./demoseries.component.html",
  styleUrls: ["./demoseries.component.scss"],
})
export class DemoseriesComponent implements OnInit {
  constructor(private http: HttpClient) {}
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
  ngOnInit(): void {
    this.http.get;
  }

  exams: any[] = [];
}

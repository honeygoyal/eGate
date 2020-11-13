import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderServicereport } from '../../service/loaderreport.service';

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderServicereport) {}
  ngOnInit(): void {}
}

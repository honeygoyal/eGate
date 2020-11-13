import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { LoaderExampanel } from '../../services/loaderexampanel';

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderExampanel) {}
  ngOnInit(): void {}
}

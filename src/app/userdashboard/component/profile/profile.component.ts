import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.user$ = this.store.pipe(select(user));
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      this.user = data;
      //console.log(`current user data: ${this.user}`);
    });

    // console.log(this.user$["actionsObserver"]["_value"]["user"]["user"]);
  }

  oldpassword: string;
  newpassword: string;
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

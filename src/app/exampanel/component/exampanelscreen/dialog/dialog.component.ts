import { Component, OnInit, Inject } from "@angular/core";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  ME: any[] = [];
  arrayofkeys: any[] = [];
  questions: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public question: any,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.questions = this.question;
    this.arrayofkeys = Object.keys(this.questions.question);
    console.log(this.arrayofkeys);
  }
  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}

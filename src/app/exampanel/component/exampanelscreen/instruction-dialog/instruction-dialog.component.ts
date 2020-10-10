import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-instruction-dialog",
  templateUrl: "./instruction-dialog.component.html",
  styleUrls: ["./instruction-dialog.component.scss"],
})
export class InstructionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InstructionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public courseDetails: any
  ) {}
  ngOnInit(): void {
    console.log(this.courseDetails);
  }
}

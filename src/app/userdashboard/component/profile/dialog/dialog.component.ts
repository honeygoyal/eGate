import { Component, OnInit, Inject } from "@angular/core";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder
  ) {}
  form: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      oldpassword: "",
      newpassword: "",
    });
  }

  submit(form) {
    //console.log(form.value);
    this.dialogRef.close(`${(form.value.oldpassword, form.value.newpassword)}`);
  }
}

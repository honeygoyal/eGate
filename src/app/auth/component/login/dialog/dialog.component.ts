import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from "@angular/core";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public http:HttpClient
   
  ) {}
  ngOnInit() {
   
  }

  submitForgot(form:NgForm){
    console.log(form.value.email)
    let url=environment.forgotpassword+form.value.email;
    console.log(url)
    this.http.post(url,{}, {
      headers: { skip: "true" },
    }).subscribe()
  }
}

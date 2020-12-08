import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-branchselection",
  templateUrl: "./branchselection.component.html",
  styleUrls: ["./branchselection.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BranchselectionComponent implements OnInit {
  BranchFullName: any = {
    CE: "Civil Engineering",
    CS: "Computer Science Engineering",
    ME: "Mechanical Engineering ",
    AE: "Aerospace Engineering",
    CH: "Chemical Engineering",
    PI: "Production and Industrial Enginnering",
    MA: "Mathematics",
    MT: "Metallurgical Engineering",
    XE: "",
    EE: "Electrical Engineering",
    ECE: "Electronics & Communication Engg.",
    IN: "Instrumentation Engineering",
  };
  user: any;
  userDiscipline: any[] = [];
  constructor(public dialogRef: MatDialogRef<BranchselectionComponent>) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user.user.discipline.indexOf(',') > -1){
      this.userDiscipline = this.user.user.discipline.split(",");
    }else{
      this.userDiscipline.push(this.user.user.discipline);
    }
    if(this.user.user.discipline === undefined){
      this.dialogRef.close();
    }
  }

  onbranchSelection(branch) {
    this.dialogRef.close(`${branch}`);
  }
}

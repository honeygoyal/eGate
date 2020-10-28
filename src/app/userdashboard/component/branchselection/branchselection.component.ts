import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-branchselection',
  templateUrl: './branchselection.component.html',
  styleUrls: ['./branchselection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BranchselectionComponent implements OnInit {
   BranchFullName:any= {
    CE : "Civil Engineering",
    CSE : "Computer Science Engineering",
    ME : "Mechanical Engineering ",
    AE : "Aerospace Engineering",
    CH:"Chemical Engineering",
    PI:"Production and Industrial Enginnering",
    MA:"Mathematics",
    MT:"Metallurgical Engineering",
    XE:"",
    EE:"Electrical Engineering",
    ECE:"Electronics & Communication Engg.",
    IN:"Instrumentation Engineering"
  }
  user:any;
  userDiscipline:any[]=[];
  constructor(
    public dialogRef: MatDialogRef<BranchselectionComponent>
  ) {}
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    this.userDiscipline=(this.user.user.discipline).split(',');
    console.log(this.userDiscipline)
  }

  onbranchSelection(branch){
    // localStorage.setItem("branchOpted",branch);
    this.dialogRef.close(`${(branch)}`)
  }

}

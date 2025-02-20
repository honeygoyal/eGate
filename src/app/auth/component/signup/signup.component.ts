import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from "src/environments/environment";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { SignUpForm } from "../../model/signupform.model";
import swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  imageuploadname: string;
  selectedOption: string = "";

  signupForm: FormGroup;
  signUpData: SignUpForm;

  constructor(
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  //ngOnit Method
  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      emailId: new FormControl(null, [Validators.required, Validators.email]),
      confirmemail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      mobileNumber: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      university: new FormControl(null, Validators.required),
      targetYear: new FormControl(null, Validators.required),
      discipline: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      checkterm: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.signupForm.value.checkterm === false) {
      swal.fire("Please accept Terms & Conditions");
    } else {
      this.signUpData = {
        name: this.signupForm.value.name,
        emailId: this.signupForm.value.emailId,
        confirmemail: this.signupForm.value.confirmemail,
        mobileNumber: this.signupForm.value.mobileNumber,
        university: this.signupForm.value.university,
        discipline: this.signupForm.value.discipline.join(","),
        qualification: this.signupForm.value.qualification,
        targetYear: this.signupForm.value.targetYear,
        address: this.signupForm.value.address,
        checkterm: this.signupForm.value.checkterm,
      };
      this.authService.saveUserProfile(this.signUpData).subscribe(
        (response) => {
          this.route.navigateByUrl("/login");
          swal.fire("Registration Successfull");
          this.signupForm.reset();
        },
        (err) => {
          if (err.error.message !== undefined) swal.fire(err.error.message);
          else swal.fire("Something went wrong");
        }
      );
    }
  }

  // toppingList: string[] = [
  //   "CS", //COMPUTER SCIENCE
  //   "ME", //MECHANICAL
  //   "PI", //PRODUCTION AND INDUSTRIAL
  //   "CH", //CHEMICAL
  //   "MT", //METALLURGICAL
  //   "CE", //CIVIL
  //   "MA", //MATHEMATICS
  //   "AE", //AEROSPACE
  //   "EE", //ELECTRICAL
  //   "ECE", //ELECTRONICS AND COMMUNICATION
  //   "IN", //INSTRUMENTATION
  //   "ES", //Environmental Science
  //   "PH", //PHYSICS
  //   "ST", //STATISTICS
  // ];

    branchMap = new Map([
      ["CS","COMPUTER SCIENCE"],
      ["ME", "MECHANICAL"],
      ["PI", "PRODUCTION AND INDUSTRIAL"],
      [ "CH", "CHEMICAL"],
      [ "MT", "METALLURGICAL"],
      ["CE", "CIVIL"],
      ["MA", "MATHEMATICS"],
      [ "AE", "AEROSPACE"],
      ["EE", "ELECTRICAL"],
      [ "ECE", "ELECTRONICS AND COMMUNICATION"],
      ["IN", "INSTRUMENTATION"],
      ["ES","Environmental Science"],
      ["PH", "PHYSICS"],
      ["ST", "STATISTICS"],
    ]);
    
}


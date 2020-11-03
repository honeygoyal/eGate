import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from "src/environments/environment";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { SignUpForm } from "../../model/signupform.model";
import swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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

  constructor(private authService: AuthService) {}

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
    console.log(this.signupForm.value);

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
        // swal.fire("Registration Successfull");
        this.signupForm.reset();
      },
      (err) => {
        swal.fire(err.error.message);
      }
    );
  }

  toppingList: string[] = [
    "CSE",
    "ME",
    "PI",
    "CH",
    "MT",
    "CE",
    "MA",
    "AE",
    "XE",
    "EE",
    "ECE",
    "IN",
  ];
}

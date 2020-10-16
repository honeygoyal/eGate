import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../service/auth.service";
import { SignUpForm } from "../../model/signupform.model";
import swal from "sweetalert2";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
const uri = environment.uploadEndPoint;

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  imageuploadname: string;
  selectedOption: string = "";
  // uploader: FileUploader = new FileUploader({ url: uri });
  // uploadEndPoint: string = "";
  // files: any[] = [];
  signupForm: FormGroup;
  signUpData: SignUpForm;

  //constructor
  // constructor(private authService: AuthService) {
  // this.uploadEndPoint = environment.uploadEndPoint;
  // this.uploader.onCompleteItem = (
  //   item: any,
  //   response: any,
  //   status: any,
  //   headers: any
  // ) => {
  //   this.imageuploadname = response;
  // };
  // }

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
    this.signupForm.controls["targetyear"].setValue(this.selectedOption, {
      onlySelf: true,
    });
  }

  onSubmit() {
    this.signUpData = {
      name: this.signupForm.value.name,
      emailId: this.signupForm.value.emailId,
      confirmemail: this.signupForm.value.confirmemail,
      mobileNumber: this.signupForm.value.mobileNumber,
      university: this.signupForm.value.university,
      discipline: this.signupForm.value.discipline,
      qualification: this.signupForm.value.qualification,
      targetYear: this.signupForm.value.targetYear,
      address: this.signupForm.value.address,
      checkterm: this.signupForm.value.checkterm,
    };
    this.authService.saveUserProfile(this.signUpData).subscribe(
      (response) => {
        swal.fire("Registration Successfull");
        this.signupForm.reset();
      },
      (err) => {
        swal.fire(err.error.message);
      }
    );
  }

  /**
   * on file drop handler
   */
  // onFileDropped($event) {
  //   this.prepareFilesList($event);
  // }

  /**
   * handle file from browsing
   */
  // fileBrowseHandler($event) {
  //   this.prepareFilesList($event.target.files);
  // }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  // deleteFile(index: number) {
  //   this.files.splice(index, 1);
  // }

  /**
   * Simulate the upload process
   */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  // prepareFilesList(files: Array<any>) {
  //   for (const item of files) {
  //     item.progress = 0;
  //     this.files.push(item);
  //   }
  //   for (const it of this.files) {
  //     this.uploadFilesSimulator(it);
  //   }
  // }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  // formatBytes(bytes, decimals?) {
  //   if (bytes === 0) {
  //     return "0 Bytes";
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals || 2;
  //   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  // }
}

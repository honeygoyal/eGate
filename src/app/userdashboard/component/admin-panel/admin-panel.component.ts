import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import Swal from "sweetalert2";
@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"],
})
export class AdminPanelComponent implements OnInit {
  isLinear = false;
  testList: any;
  
  unverifiedUsers:any;
  examCode: any = {
    examId: "",
  };
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  exams_code: any;
  exams_code_array: any[] = [];
  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private sanitizer: DomSanitizer) {}
  user:any=JSON.parse(localStorage.getItem("user"));
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      courseId: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      examId: ["", Validators.required],
      totalMarks: ["", Validators.required],
      totalQuestion: ["", Validators.required],
      duration: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      examId: ["", Validators.required],
      courseId: ["", Validators.required],
    });

    this.http
      .get("http://localhost:8080/coursesOffered/getAllCoursesOffered")
      .subscribe((data) => {
        this.exams_code = data;
        for (let exam of this.exams_code) {
          // console.log(exam["examId"]);
          this.exams_code_array.push(exam["examId"]);
        }
      });
    this.http.get("http://localhost:8080/users/findAllUnVerifiedUser?userId="+this.user.user.id).subscribe(data=>{
      this.unverifiedUsers=data;
      console.log(this.unverifiedUsers)
    })
  }
  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
  onSubmit() {
    console.log(this.firstFormGroup);
    this.http
      .post(
        "http://localhost:8080/coursesDetail/createTest",
        this.firstFormGroup.value,
        {
          headers: { skip: "true" },
        }
      )
      .subscribe(data=>{
        console.log(data)
        this.firstFormGroup.reset({
          courseId:'',
          title:'',
          description:'',
          examId:'',
          totalMarks:'',
          totalQuestion:'',
          duration:'',
          startDate:'',
          endDate:'',
        });
        Swal.fire("Test Created!");
      });
  }

  onExamCodeSelect() {
    console.log(this.examCode);
    if(this.examCode!== ""){
    this.http
      .get("http://localhost:8080/coursesDetail/getCourseIdListForAdmin", {
        params: { exam_code: this.examCode["examId"] },
      })
      .subscribe((data) => {
        this.testList = data;
      });
    }
  }
  srcResult: string;
  onFileSelected(event) {
   const file =event.target.files[0];
   this.userFile=file;
   
  }

  public userFile :any=File;
  onSubmitfile() {
    // console.log(this.secondFormGroup.value);
    let server_url =
      "http://localhost:8080/questionLayout/upload?courseId=" +
      this.secondFormGroup.value.courseId;
    const formData = new FormData();
    formData.append("file", this.userFile);
    this.http
      .post(server_url, formData, {
        headers: { skip: "true" },
      })
      .subscribe((data) => {
        this.secondFormGroup.reset();
        Swal.fire("Question Uploaded for Test!");
      });
  }
  comment:any;
  VerificationAction(action,id,form:NgForm){
    console.log(form)
    console.log(action)
    console.log(id)
    this.http.post("http://localhost:8080/users/verification?userId="+id+"&isVerified="+action+"&comment="+form.value.comment,{}).subscribe(data=>{
      location.href=location.href;
    })
  }

}

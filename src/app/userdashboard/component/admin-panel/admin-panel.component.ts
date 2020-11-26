import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { SelectServiceService } from '../../service/select-service.service';
import { environment } from "./../../../../environments/environment";
import { Department } from './department.model';
import { Exam } from './exam.model';
import { Subsection } from './subsection.model';

interface Food {
  value: string;
  viewValue: string;
}



@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"],
})
export class AdminPanelComponent implements OnInit {
  isLinear = false;
  testList: any;
  selectedExam: Exam = new Exam(2, "Brazil");
  unverifiedUsers: any;
  examCode: any = {
    examId: "",
  };
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  exams_code: any;
  exams_code_array: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private selectService: SelectServiceService
  ) {}
  user: any = JSON.parse(localStorage.getItem("user"));
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

    this.http.get(environment.getAllCoursesOffered).subscribe((data) => {
      this.exams_code = data;
      for (let exam of this.exams_code) {
        this.exams_code_array.push(exam["examId"]);
      }
    });
    this.http
      .get(environment.findAllUnVerifiedUser + this.user.user.id)
      .subscribe((data) => {
        this.unverifiedUsers = data;
        console.log(this.unverifiedUsers);
      });

      this.exams = this.selectService.getExam();
    this.onSelectExam(this.selectedExam.id);
  }
  transform(imageString: string) {
    var base64Image = "data:image/png;base64," + imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  submitDownload(form:NgForm){
    console.log(form.value)
    const formData = new FormData();
    formData.append("label1File", this.File1);
    formData.append("label2File", this.File2);
    let url=environment.createDownloadAdmin+form.value.label1+"&label2="+form.value.label2+"&topic="+form.value.topic+"&exam="+form.value.exam+"&subsection="+form.value.subsection+"&branch="+form.value.branch
    this.http.post(url,formData).subscribe((data)=>{
      console.log(data);
      form.reset();
      Swal.fire(
        'Good job!',
        'Data Uploaded',
        'success'
      ),
      (err)=>{
Swal.fire('Something went wrong');
      }
    })

  }
  // Examnamefromid(name:string):string{
  //   let exam:Exam[]= this.selectService.getExam().filter(item=>item.name===name)
  //   return exam[0].name;
  // }
  // Subsectionnamefromid(name:string):string{
  //   let subsection:Subsection[]= this.selectService.getSubsection().filter(item=>item.name===name)
  //   return subsection[0].name;
  // }
  // Branchnamefromid(name:string):string{
  //   let dept:Department[]= this.selectService.getbranch().filter(item=>item.name===name)
  //   return dept[0].name;
  // }

  exams: Exam[];
  subsections: Subsection[];
  branches: Department[];
  onSelectExam(Examid:number){
    this.subsections = this.selectService.getSubsection().filter(item => item.Examid == Examid);
  }
  onSelectSubsection(Subsectionid:number){
    console.log(Subsectionid);
    this.branches = this.selectService.getbranch().filter(item => item.Subsectionid == Subsectionid);
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  onSubmit() {
    console.log(this.firstFormGroup);
    const token = this.getToken();
    this.http
      .post(environment.createTest, this.firstFormGroup.value)
      .subscribe((data) => {
        console.log(data);
        this.firstFormGroup.reset({
          courseId: "",
          title: "",
          description: "",
          examId: "",
          totalMarks: "",
          totalQuestion: "",
          duration: "",
          startDate: "",
          endDate: "",
        });
        Swal.fire("Test Created!");
      });
  }
  getToken(): string {
    var ret = JSON.parse(localStorage.getItem("user"));
    return ret.token;
  }
  onExamCodeSelect() {
    console.log(this.examCode);
    if (this.examCode["examId"] !== "") {
      this.http
        .get(environment.getCourseIdListForAdmin, {
          params: { exam_code: this.examCode["examId"] },
        })
        .subscribe((data) => {
          this.testList = data;
        });
    }
  }
  srcResult: string;

  onFileSelected(event) {
    const file = event.target.files[0];
    this.userFile = file;
  }
  onFile1Selected(event) {
    const file = event.target.files[0];
    this.File1 = file;
  }
  onFile2Selected(event) {
    const file = event.target.files[0];
    this.File2 = file;
  }

  public userFile: any = File;
  public File1: any = File;
  public File2: any = File;
  onSubmitfile() {
    // console.log(this.secondFormGroup.value);
    let server_url =
      environment.questionLayoutUpload + this.secondFormGroup.value.courseId;
    const formData = new FormData();
    formData.append("file", this.userFile);
    const token = this.getToken();
    this.http.post(server_url, formData).subscribe((data) => {
      this.secondFormGroup.reset();
      Swal.fire("Question Uploaded for Test!");
    });
  }
  comment: any;
  VerificationAction(action, id, form: NgForm) {
    console.log(form);
    console.log(action);
    console.log(id);
    this.http
      .post(
        environment.userVerification +
          id +
          "&isVerified=" +
          action +
          "&comment=" +
          form.value.comment,
        {}
      )
      .subscribe((data) => {
        location.href = location.href;
      });
  }

  
}

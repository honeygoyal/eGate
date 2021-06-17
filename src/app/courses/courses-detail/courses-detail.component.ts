import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { PaymentService } from "../../shared/services/payment.service";
import Swal from "sweetalert2";
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
declare var Razorpay:any;


@Component({
  selector: "app-courses-detail",
  templateUrl: "./courses-detail.component.html",
  styleUrls: ["./courses-detail.component.scss"],
})
export class CoursesDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute,private paymentService: PaymentService) {}
  contentSelected: string;
  content: string;
  user:any;
  discipline:any;
  selectedCheckBoxValues:any=[];
  amount:number=0;
  currency:string= "INR";
  notes:string= "EGatetutor payment";
  receipt: string="";
  initialCourseAmount:number=0;
  razorPayOptions={
    "key":'',
    "amount":'',
    "currency":"INR",
    "name":'',
    "description":"EGatetutor payment",
    "order_id":'',
    "handler":(res) => {
      this.razorPayResponseHandler(res);
    }
  };
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.contentSelected = params["subject"];
      this.content = params["content"];
      this.user=JSON.parse(localStorage.getItem("user"));
      this.discipline=this.user.user.discipline.split(",");
      this.receipt=this.user.user.id.toString();
    });
  }

  paymentstart() {
    if(location.href.indexOf("gate/online%20test%20series") > -1){
      event.preventDefault();
      let constructHtml="";
      let subscribedBranches="";
      this.amount=0;
      let examType=this.getExamType(this.content,false);
      if(this.user.user.coursesOffered.length > 0){
        this.user.user.coursesOffered.forEach(subscribedCourse => {
          let constructedExamId:string=subscribedCourse.branch.toUpperCase()+"-"+this.contentSelected.toUpperCase()+"-"+examType;
         if(constructedExamId === subscribedCourse.examId){
           subscribedBranches=subscribedBranches+subscribedCourse.branch+";";
         }
        });
      }
      
      let dialogTitle='&nbsp;&nbsp;Select branches';
      this.discipline.forEach(branch => {
        if(subscribedBranches.indexOf(branch) === -1){
          let branchFullName=this.getExamFullName(branch);
          constructHtml=constructHtml+'<input class="inputConstructHtml" type="checkbox" id="'+branch+'"/>&nbsp;&nbsp;'+ branchFullName +'<br/>';
        }
      });
      
      let outerHtml:string='<div style="line-height: inherit;text-align: left;margin-left: 90px;">'+constructHtml+'</div>';
      if(constructHtml === ""){
        dialogTitle='All the branches available to you have already been subscribed!!';
        Swal.fire({
          title: dialogTitle,
          html: constructHtml,
          showCancelButton: true,
          showCloseButton: true
        });
      }
      else{
        Swal.fire({
          title: dialogTitle,
          html: outerHtml,
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          showCloseButton: true,
          inputValidator: (result) => {
            return !result && 'You need to select one of the branches'
          },
          preConfirm: () => {
            let checkBoxValue:any;
            examType=this.getExamType(this.content,true);
            this.discipline.forEach(branch => {
              checkBoxValue=document.getElementById(branch);
              if(checkBoxValue !== null){
                if(checkBoxValue.checked === true){
                  let constructedExamId:string=branch.toUpperCase()+"-"+this.contentSelected.toUpperCase()+"-"+examType;
                   this.selectedCheckBoxValues.push(constructedExamId);
                   this.amount=this.amount+this.initialCourseAmount;
                }
              }
            });
            this.amount=this.amount*100;
           }
        }).then((result) => {
          if(this.amount > 0 && result.isConfirmed){
            this.paymentService
            .postSubmittedOrder({
              amount: this.amount,
              currency: this.currency,
              notes: this.notes,
              receipt: this.receipt
            })
            .subscribe(
              (data) => {
                console.log("Successfully initiated the order");
                this.razorPayOptions.order_id= data["orderId"];
                this.razorPayOptions.currency= data["currency"];
                this.razorPayOptions.amount= data["amount"];
                this.buyRazorPay();
              },
              (err) => {
                console.log(err);
              }
            );
          }
          else{
            if(this.amount <= 0 && result.isConfirmed){
              console.log("None of the branches shown in the dialog were selected");
            } else{
              console.log("Cancelled the order");
            }
          }
        })
      }
    }else{
      Swal.fire("Registration will start soon!");
    }
  }

  buyRazorPay(){
    var rzpPayment=new Razorpay(this.razorPayOptions);
    rzpPayment.open();
  }

  getExamFullName(branchName:string){
    switch (branchName) {
      case "CE":
        return "Civil Engineering";
      case "CS":
        return "Computer Science Engineering";
      case "ME":
        return "Mechanical Engineering";
      case "AE":
        return "Aerospace Engineering";
      case "CH":
        return "Chemical Engineering";
      case "PI":
        return "Production and Industrial Enginnering";
      case "MA":
        return "Mathematics";
      case "MT":
        return "Metallurgical Engineering";
      case "EE":
        return "Electrical Engineering";
      case "ECE":
        return "Electronics & Communication Engg.";
      case "IN":
        return "Instrumentation Engineering";
      case "ST":
        return "Statistics";
      case "PH":
        return "Physics";
      case "ES":
        return "Environmental Science";
      default:
        return "";
    }
  }

  getExamType(examType:string,isInDialog:boolean){
    switch (examType) {
      case "online test series":
        if(isInDialog){
          this.initialCourseAmount=+document.getElementById("OTS").innerHTML;
        }
        
        return "OTS";
      case "question bank":
        if(isInDialog){
          this.initialCourseAmount=+document.getElementById("QB").innerHTML;
        }
        
        return "QB";
      case "video lectures":
        if(isInDialog){
          this.initialCourseAmount=+document.getElementById("VL").innerHTML;
        }
        
        return "VL";
      case "e-study material":
        if(isInDialog){
          this.initialCourseAmount=+document.getElementById("ESM").innerHTML;
        }
        
        return "ESM";
      case "complete course":
        if(isInDialog){
          this.initialCourseAmount=+document.getElementById("CP").innerHTML;
        }
        
        return "CP";
      default:
        return "";
    }
  }

  razorPayResponseHandler(razorPayResponse:any){
    console.log("response"+razorPayResponse);
    this.paymentService
    .postVerifiedPayment({
      examId: this.selectedCheckBoxValues,
      orderId: razorPayResponse["razorpay_order_id"],
      paymentId: razorPayResponse["razorpay_payment_id"],
      signature:razorPayResponse["razorpay_signature"],
      userId: +this.receipt
    })
    .subscribe(
      (data) => {
        console.log("Successfully verified the payment");
        Swal.fire("Payment suceeded!");
        location.href=location.href.toLowerCase().replace("courses/gate/online%20test%20series","userdashboard/testseries/"+localStorage.getItem("branchOpted")+"-GATE-OTS");
      },
      (err) => {
        console.log("Payment has failed"+err);
        Swal.fire("Payment has failed");
      }
    );
  }
}

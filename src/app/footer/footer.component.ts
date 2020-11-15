import { Component, OnInit } from "@angular/core";
import "./../../assets/smtp.js";
import "./../../assets/chat.js";
import { NgForm } from "@angular/forms";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import Swal from "sweetalert2";
declare let Email: any;
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  constructor(private spinnerService: Ng4LoadingSpinnerService) {}

  ngOnInit() {}

  openModal() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("fade").style.display = "block";
  }

  closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("fade").style.display = "none";
  }
  onSubmit(f: NgForm) {
    Email.send({
      Host: "smtpout.asia.secureserver.net",
      Username: "support@egatetutor.in",
      Password: "egatetutor_2019",
      To: "support@egatetutor.in",
      From: "support@egatetutor.in",
      Subject: "Mail sent from: " + f.value.email,
      Body: `
      <i>This is feedback mail.</i> <br/> 
      <b>Name: </b>${f.value.name} <br /> 
      <b>Email: </b>${f.value.email}<br />
      <b>Message:</b>  ${f.value.message}<br />  `,
    }).then((message) => {
      Swal.fire("Message Sent!");
      f.resetForm();
    });
  }
}

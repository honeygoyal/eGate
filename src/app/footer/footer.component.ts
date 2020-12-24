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
  constructor() {}

  ngOnInit() {}
  openInsta(){
    window.open("https://www.instagram.com/egatetutor/");
  }
  openFacebook(){
    window.open("https://www.facebook.com/egate.tutor.18");
  }
  openYoutube(){
    window.open("https://www.youtube.com/egatetutor");
  }
  openTelegram(){
    window.open("https://t.me/joinchat/WPTxOBfc0M2nlMta9CS1Og");
  }
  
}

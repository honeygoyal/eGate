import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/reducers";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";
import { BranchselectionComponent } from "../branchselection/branchselection.component";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BranchOptedService } from "../../service/branch-opted.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: any;
  popupEnabled: any;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private branchOptedService: BranchOptedService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}
  branches: any[] = [];
  branchOpted: any;
  isVerified:boolean;
  profilePhoto: string;
  signature:string;
  ngOnInit(): void {
    this.store.pipe(map((data) => data["auth"]["user"])).subscribe((data) => {
      if (data !== undefined) {
        this.user = data;
        this.branches = this.user.user.discipline.split(",");
        this.isVerified=this.user.user.verified;
        this.profilePhoto = this.user.user.photo;
        this.signature=this.user.user.signature;
      }
    });
  }

  oldpassword: string;
  newpassword: string;
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public photoFile: any = File;
  public signFile: any = File;

  public IdFile: any = File;
  readURL(input, val) {
    console.log(input.target.files[0]);

    console.log(input);
    if (input.target.files && input.target.files[0]) {
      switch (val) {
        case 1:
          this.photoFile = input.target.files[0];
          break;
        case 0:
          this.signFile = input.target.files[0];
          break;
        case 2:
          this.IdFile = input.target.files[0];
          break;
        default:
          break;
      }
      var defaultImg =
        "Photograph<br>Passport Size<br><br>3.5x4.5cm<br>Size:200KB";
      var reader = new FileReader();
      reader.readAsDataURL(input.target.files[0]);

      reader.onload = function (e) {
        var str1 = "<img src='' width='110px' height='100'/>";
        if (val == 1) {
          $("#samplePhoto").html(str1);
          var value = $("#photo").val();
          $("#photo_text").html("File Selected");
          $("#error1_text").removeClass("error_txtbx");
        }
        if (val == 0) {
          var value = $("#sign").val();
          $("#sampleSign").html(str1);
          $("#sign_text").html("File Selected");
          $("#error2_text").removeClass("error_txtbx");
        }
        if (val == 2) {
          var value = $("#idcard").val();
          $("#id_proof").html("File Selected");
          $("#error3_text").removeClass("error_txtbx");
        }
        var ext = value.split(".").pop().toLowerCase();
        var extcount = value.split(".");
        if (
          $.inArray(ext, ["jpg", "jpeg", "png", "pdf"]) == -1 ||
          extcount.length > 2
        ) {
          $("#iErr").html(value + " is invalid File!");
          $("#iErr").show();
          $("#iErr").fadeOut(5000);
          $("#sign").focus();
          $("#sign").addClass("error_txtbx");
          if (val == 1) {
            $("#photo_text").html("No file Selected");
            $("#samplePhoto").html(defaultImg);
          }
          if (val == 0) {
            $("#sign_text").html("No file Selected");
            $("#sampleSign").html(defaultImg);
          }
          if (val == 2) {
            $("#id_proof").html("No file Selected");
            // $('#sampleSign').html(defaultImg);
          }
          return false;
        }
        if (input.target.files[0].size > 200000 && val == 1) {
          $("#iErr").html(
            "The file must be less than 200kb so please upload another Photo."
          );
          $("#iErr").show();
          $("#iErr").fadeOut(5000);
          $("#photo").focus();
          $("#photo").val("");
          $("#samplePhoto").html(defaultImg);
          $("#photo_text").html("No file Selected");
          return false;
        } else if (input.target.files[0].size > 200000 && val == 0) {
          $("#iErr").html(
            "The file must be less than 200kb so please upload another signature."
          );
          $("#iErr").show();
          $("#iErr").fadeOut(5000);
          $("#sign").focus();
          $("#sign").val("");
          $("#sampleSign").html(defaultImg);
          $("#sign_text").html("No file Selected");
          return false;
        } else if (
          input.target.files[0].size > 500000 &&
          (val == "" || val == 2)
        ) {
          $("#iErr").html(
            "The file must be less than 500kb so please upload another  Id proof."
          );
          // $('#id_proof').html("No file Selected")
          $("#iErr").show();
          $("#iErr").fadeOut(5000);
          $("#idcard").focus();
          $("#idcard").val("");
          $("#id_proof").html("No file Selected");
          return false;
        } else {
          //  $("#error1_text").val('');
          var str =
            "<img src='" +
            e.target.result +
            "'  width='130px' height='90px'/>";
          // var str="<img [src]='transform("+input.target.value+")' width='110px' height='90'/>";
          console.log(str);
          if (val == 1) $("#samplePhoto").html(str);
          if (val == 0) $("#sampleSign").html(str);
        }
      };
    }
  }

  transform(imageString: string) {
    var base64Image = "data:image/png;base64,"+imageString;
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  Submitdocs() {
    if (this.photoFile.length !== undefined) {
      $("#iErr").html("Please Upload Profile Photo");
      // $('#id_proof').html("No file Selected")
      $("#iErr").show();
      $("#iErr").fadeOut(5000);
      $("#idcard").focus();
      $("#idcard").val("");
    } else if (this.signFile.length !== undefined) {
      $("#iErr").html("Please Upload Signature Photo");
      // $('#id_proof').html("No file Selected")
      $("#iErr").show();
      $("#iErr").fadeOut(5000);
      $("#idcard").focus();
      $("#idcard").val("");
    } else if (this.IdFile.length !== undefined) {
      $("#iErr").html("Please Upload ID Proof Photo");
      // $('#id_proof').html("No file Selected")
      $("#iErr").show();
      $("#iErr").fadeOut(5000);
      $("#idcard").focus();
      $("#idcard").val("");
    } else {
      const formData = new FormData();
      formData.append("profileFile", this.photoFile);
      formData.append("signatureFile", this.signFile);
      formData.append("govtIdFile", this.IdFile);
      this.http
        .post(environment.uploadProfileData + this.user.user["id"], formData)
        .subscribe((data) => {
          console.log(data);
          Swal.fire("Document Uploaded Successfully");
        });
    }
  }
}

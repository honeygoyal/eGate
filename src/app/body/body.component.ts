import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.scss"],
})
export class BodyComponent implements OnInit {
  bannerImagesObject:any=[];
  bookImagesObject:any=[];

  constructor( private http: HttpClient) {}

  ngOnInit() {
    this.http.get(environment.getAllBanners).subscribe((bannerData) => {
     Object.keys(bannerData).forEach((key) => {
      let bannerImages = bannerData[key];
      let bannerImage:any={
        image: bannerImages.imageUrl,
        thumbImage: bannerImages.imageUrl
      }
   
      this.bannerImagesObject.push(bannerImage);
     });
     
    },
    (err) => {
      console.log("getting banner images has failed"+err);
    });

    this.http.get(environment.getAllBooks).subscribe((booksData) => {
      Object.keys(booksData).forEach((key) => {
        let bookImages = booksData[key];
        let bookImage:any={
          image: bookImages.imageUrl,
          thumbImage: bookImages.imageUrl,
          imageClick:bookImages.googlePlayUrl
        }
     
        this.bookImagesObject.push(bookImage);
       });
    },
    (err) => {
      console.log("getting book images has failed"+err);
    });
  }

  soonUpdateMessage() {
    event.preventDefault();
    Swal.fire("Content soon to be updated!");
  }
  regtoopen() {
    Swal.fire("Registration will start soon!");
  }
}

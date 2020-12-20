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
    this.http.get(environment.getAllBanners, {
      headers: { skip: "true" },
    }).subscribe((bannerData) => {
     Object.keys(bannerData).forEach((key) => {
      let bannerImages = bannerData[key];
      let bannerImage:any={
        image: bannerImages.imageUrl,
        thumbImage: bannerImages.imageUrl
      }
   
      this.bannerImagesObject.push(bannerImage);
     });
     
    })

    this.http.get(environment.getAllBooks, {
      headers: { skip: "true" },
    }).subscribe((booksData) => {
      Object.keys(booksData).forEach((key) => {
        let bookImages = booksData[key];
        let bookImage:any={
          image: bookImages.imageUrl,
          thumbImage: bookImages.imageUrl,
          url:bookImages.googlePlayUrl
        }
     
        this.bookImagesObject.push(bookImage);
       });
    })
  }
  clickbookfunc(e:Event){
    // location.href=
    // this.bookImagesObject[+e].googlePlayUrl
    window.open(this.bookImagesObject[+e].googlePlayUrl, "_blank"); 
    console.log(this.bookImagesObject[+e].url);
  }
  soonUpdateMessage() {
    event.preventDefault();
    Swal.fire("Content soon to be updated!");
  }
  regtoopen() {
    Swal.fire("Registration will start soon!");
  }
}

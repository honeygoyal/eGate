import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SelectServiceService } from '../userdashboard/service/select-service.service';
import { DownloadService } from './downloadservice';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit ,OnDestroy{
  exam:any;
  
  branch:any[]=[];
  topics:any[]=[];
  pageData:any;
  constructor(private route: ActivatedRoute,private downloadService:DownloadService,private selectService: SelectServiceService,private http:HttpClient) { 
  }
 
 
  ngOnDestroy(): void {
    this.topics=[]
  }
 

  ngOnInit(): void {
    this.downloadService.aClickedEvent.subscribe((data:string)=>{
      console.log(data);
      this.onSelectExam(data)
    })
     this.route.params.subscribe((params: Params) => {
        this.exam = params["exam"];
        this.onSelectExam(this.exam)
      });
   
  }

  onSelectExam(Examid:any){
    this.topics = this.selectService.getSubsection().filter(item => item.Examid == Examid);
  }

  onSelectSubsection(Subsectionid:number){
    console.log(Subsectionid);
    this.branch = this.selectService.getbranch().filter(item => item.Subsectionid == Subsectionid);
  }

  submitDownload(form:NgForm){
    this.route.params.subscribe((params: Params) => {
      this.exam = params["exam"];
    });
    console.log(this.exam)
    console.log(form.value);
    this.http.get(environment.getDownloadData+this.exam+"&subsection="+form.value.topic+"&branch="+form.value.branch,{
      headers: { skip: "true" },
    }).subscribe((data)=>{
      console.log(data)
      this.pageData=data;
      console.log(data);
    })
  }

}

import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DownloadService } from './downloadservice';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit ,OnDestroy{
  exam:string;
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  branch:any[]=[];
  topics:any[]=[];
  constructor(private route: ActivatedRoute,private downloadService:DownloadService) { 
    
  }
 
 
  ngOnDestroy(): void {
    this.topics=[]
  }
  state(exam:any){
    switch (this.exam) {
      case 'GATE':
          this.branch=['CS','ME']
          this.topics=[{value:'',viewValue:'Previous GATE Papers with Solutions'},{value:'',viewValue:'Engineering Mathematics'},{value:'',viewValue:'Quantitative Aptitude'}]
        break;
      case 'iPATE':
        this.branch=['CS','ME']
        this.topics=[{value:'',viewValue:'Previous iPATE Papers with Solutions'},{value:'',viewValue:'Cognitive Abilities'},{value:'',viewValue:'Professional Abilities'},{value:'',viewValue:'Technical Abilities'}]
        break;
      case 'ESE':
        this.branch=['CS','ME']
        this.topics=[{value:'',viewValue:'Previous ESE Papers (Prelims) with Solutions'},{value:'',viewValue:'Previous ESE Papers (Mains) with Solutions'},{value:'',viewValue:'General Studies and Engineering Aptitude'}]
        break;
      case 'IIT-JAM':
        this.branch=['CS','ME']
        this.topics=[{value:'',viewValue:'ISRO'},{value:'',viewValue:'BARC'}]
        break;
      case 'PSU':
        this.branch=['CS','ME']
        this.topics=[{value:'',viewValue:'ISRO'},{value:'',viewValue:'BARC'}]
        break;
      case 'PSU':
        this.branch=['CS','ME']
        this.topics=[{value:'',viewValue:'ISRO'},{value:'',viewValue:'BARC'}]
        break;
      case 'TIFR':
        this.branch=['CS','ME']
        this.topics=[{value:'',viewValue:'ISRO'},{value:'',viewValue:'BARC'}]
        break;
      case 'JEST':
        this.branch=['CS','ME']
        this.topics=[{value:'',viewValue:'Physics'},{value:'',viewValue:'Theoretical Computer Science'}]
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.downloadService.aClickedEvent.subscribe((data:string)=>{
      this.state(data)
    })
    this.route.params.subscribe((params: Params) => {
      this.exam = params["exam"];
      this.state(this.exam);
    });
  }

  

}

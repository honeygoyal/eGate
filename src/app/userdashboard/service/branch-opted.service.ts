import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchOptedService {
  branchOpted:any;
  constructor() { }
  branchSelected(branch){
    this.branchOpted=branch;
  }
  getBranch(){
    return this.branchOpted;
  }
}

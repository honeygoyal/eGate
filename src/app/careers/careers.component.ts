import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Careers',
  templateUrl: './Careers.component.html',
  styleUrls: ['./Careers.component.scss']
})
export class CareersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  openWindow() {
    window.open("https://docs.google.com/forms/d/1_OaDeSDj8NwXSnOqE4zSBFtgcvYIdnp2nChTRzFSFuI/viewform?edit_requested=true", "windowOpenTab");
  }

}

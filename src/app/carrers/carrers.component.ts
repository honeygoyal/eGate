import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrers',
  templateUrl: './carrers.component.html',
  styleUrls: ['./carrers.component.scss']
})
export class CarrersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  openWindow() {
    window.open("https://docs.google.com/forms/d/1_OaDeSDj8NwXSnOqE4zSBFtgcvYIdnp2nChTRzFSFuI/viewform?edit_requested=true", "windowOpenTab");
  }

}

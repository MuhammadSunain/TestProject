import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ecm-top-screen-header',
  templateUrl: './ecm-top-screen-header.component.html',
  styleUrls: ['./ecm-top-screen-header.component.scss']
})
export class EcmTopScreenHeaderComponent implements OnInit {

  @Input()
  screen_name: any = "NULL";

  constructor() { }

  ngOnInit(): void {
  }

}

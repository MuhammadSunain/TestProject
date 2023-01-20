import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss']
})
export class CustomGridComponent implements OnInit {

  @Input() colDefs: any = [];
  @Input() data: any = [];
  constructor() { }

  ngOnInit(): void {
    // this.colDefs = this.colDefs;
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {EcmLookupComponent} from '../ecm-lookup/ecm-lookup.component';

@Component({
  selector: 'ecm-dropdown',
  templateUrl: './ecm-dropdowm.component.html',
  styleUrls: ['./ecm-dropdowm.component.scss']
})
export class EcmDropdowmComponent implements OnInit {

  @ViewChild('lookup') lookup?: EcmLookupComponent;

  @Input()
  dropdownCaption: any = "";
  @Input()
  position: any = 1;
  @Input()
  colDefsArr: any = [];
  @Input()
  type: any = 1;
  @Input()
  InputControlName: any = "";
  @Input()
  lookupdata: any = [];
  left: any;
  constructor() { }

  ngOnInit(): void {
    if(this.position === 1) {
      this.left = 6 + "px"
    } else if(this.position === 2) {
      this.left = 181 + "px"
    }
  }
  openLookup() {
    this.lookup?.openLookup(this.lookupdata, this.dropdownCaption, this.colDefsArr);
  }

  checkType() {
    if(this.type === 1) {
      this.openLookup();
    } else {
    }
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ecm-btn-group',
  templateUrl: './ecm-btn-group.component.html',
  styleUrls: ['./ecm-btn-group.component.scss']
})
export class EcmBtnGroupComponent implements OnInit {

  @Input() 
  BtnText: any = "";
  @Output('EcmBtnclick')
  EcmBtnclick: EventEmitter<any> = new EventEmitter();
  @Input() 
  IconClass: any = "";

  constructor() { }

  ngOnInit(): void {
  }

  async EcmBtnClick() {
    this.EcmBtnclick.emit();
  }

}

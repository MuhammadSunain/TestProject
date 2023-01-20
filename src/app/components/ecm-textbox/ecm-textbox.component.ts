import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ecm-textbox',
  templateUrl: './ecm-textbox.component.html',
  styleUrls: ['./ecm-textbox.component.scss']
})
export class EcmTextboxComponent implements OnInit {

  @Input()
  labelCaption: any = "";
  @Input()
  placeholder: any = "";
  @Input()
  type: any = "text";
  @Input()
  disabaled = false;
  @Input() InputControlName: any = "";
  @Output('onBlur')
  onBlur: EventEmitter<any> = new EventEmitter();
  feild: any;
  constructor() { }

  ngOnInit(): void {
    this.feild = this.InputControlName;
    console.log(this.InputControlName);
  }
  
  onblur() {
    this.onBlur.emit();
  }

}

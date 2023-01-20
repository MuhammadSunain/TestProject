import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {ModalManager} from 'ngb-modal';
declare var $: any;

@Component({
  selector: 'dcs-error',
  templateUrl: './dcs-error.component.html',
  styleUrls: ['./dcs-error.component.scss']
})
export class DcsMessageComponent implements OnInit {
  @Input() message: any = "";
  @Input() type: number = 0;
  @Input() title: string = "";
  constructor(private modalService: ModalManager){}

  ngOnInit(): void {
    
  }

  @ViewChild('dcserror') dcserror:any;
  private modalRef: any;

  async drag() {
    $(".modal-dialog").draggable({
      handle: ".drapClass",
    });
    $("modal-dialog").css({ top: 0, left: 0, right: 0, bottom: 0 });
  }

  async open(){
    await this.drag();
      this.modalRef = this.modalService.open(this.dcserror, {
          size: "md",
          modalClass: 'mymodal',
          hideCloseButton: false,
          centered: true,
          backdrop: true,
          animation: true,
          keyboard: true,
          closeOnOutsideClick: false,
          backdropClass: "modal-backdrop"
      })
  }

  close(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}

}

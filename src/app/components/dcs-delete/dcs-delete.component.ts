import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {ModalManager} from 'ngb-modal';
import { BaseService } from 'src/app/@Core/Services/base.service';
declare var $: any;

@Component({
  selector: 'dcs-delete',
  templateUrl: './dcs-delete.component.html',
  styleUrls: ['./dcs-delete.component.scss']
})
export class DcsDeleteComponent implements OnInit {
  @Input() type: any = 1;
  @Input() message: any = "";
  caption: any = '';
  deleteingid: any;

  @Output('delete')delete: EventEmitter<any> = new EventEmitter();
  @Output('custmfunc')custmfunc: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: ModalManager, private baseSer: BaseService){}

  ngOnInit(): void {
    this.deleteingid = this.baseSer.rowid;
    if(this.type === 1) {
      this.caption = "Confrimation"
    } else if(this.type === 2) {
      this.caption = "Delete";
      this.message = "Are you sure you want to delete record?"
    } else {
      this.caption = '-';
    }
  }

  @ViewChild('dcsdelete') dcsdelete:any;
  private modalRef: any;

  async drag() {
    $(".modal-dialog").draggable({
      handle: ".drapClass",
    });
    $("modal-dialog").css({ top: 0, left: 0, right: 0, bottom: 0 });
  }

  async open(){
    await this.drag();
      this.modalRef = this.modalService.open(this.dcsdelete, {
          size: "md",
          modalClass: 'mymodal',
          hideCloseButton: false,
          centered: true,
          backdrop: true,
          animation: true,
          keyboard: false,
          closeOnOutsideClick: false,
          backdropClass: "modal-backdrop"
      })
  }

  close(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}

// deleteFunction() {
//   this.delete.emit();
// }

yesFunction() {
  if(this.type === 1) {
    this.custmfunc.emit();
  } else if(this.type === 2) {
    this.delete.emit();
  }
}

}

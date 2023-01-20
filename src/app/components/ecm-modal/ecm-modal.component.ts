import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {ModalManager} from 'ngb-modal';
declare var $: any;

@Component({
  selector: 'ecm-modal',
  templateUrl: './ecm-modal.component.html',
  styleUrls: ['./ecm-modal.component.scss']
})
export class EcmModalComponent implements OnInit {

  @Input()
  caption: any = "";
  @Input()
  showModalBtnToolBar: any = true;
  @Input()
  showModalBasicToolBar: any = true;
  @Input()
  showCaptionIcon: any = true;
  @Input()
  hideNew: any = true;
  @Input()
  type: any = 1;
  @Input()
  hideSave: any = true;
  @Input()
  hideSaveClose: any = true;
  @Input()
  hideClose: any = true;
  @Output('Save')Save: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }

  @ViewChild('myModal') myModal:any;
    private modalRef: any;
    constructor(private modalService: ModalManager){}

    async drag() {
      $(".modal-dialog").draggable({
        handle: ".drapClass",
      });
      $("modal-dialog").css({ top: 0, left: 0, right: 0, bottom: 0 });
    }
 
    async open(size: string = "lg"){
      await this.drag();
        this.modalRef = this.modalService.open(this.myModal, {
            size: size,
            modalClass: 'mymodal',
            hideCloseButton: false,
            centered: false,
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

    async PostData() {
      this.Save.emit();
    }

    async SaveandClose() {
      this.Save.emit();
      this.close();
    }

}

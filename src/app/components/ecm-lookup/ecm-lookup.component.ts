import { Component, OnInit ,ViewChild, Input } from '@angular/core';
import {ModalManager} from 'ngb-modal';
import { LookupServiceService } from './lookup-service.service'
declare var $: any;

@Component({
  selector: 'ecm-lookup',
  templateUrl: './ecm-lookup.component.html',
  styleUrls: ['./ecm-lookup.component.scss']
})
export class EcmLookupComponent implements OnInit {

  @Input() caption: any = "";
  @Input() rowdata: any;
  @Input() ColDefs: any = [];
  @Input() total: Number = 0.00;
  private modalRef: any;
  lookupdataArray: any = [];
  @ViewChild('ecmlookup') ecmlookup:any;
  constructor(private modalService: ModalManager){
  }

  async drag() {
    $(".modal-dialog").draggable({
      handle: ".drapClass",
    });
    $("modal-dialog").css({ top: 0, left: 0, right: 0, bottom: 0 });
  }

  ngOnInit(): void {
  }

  async openLookup(data: any = [],title: string = "",colDefsArr: any = []){
    await this.drag();
      this.modalRef = this.modalService.open(this.ecmlookup, {
          size: "lg",
          modalClass: 'mymodal',
          hideCloseButton: false,
          centered: false,
          backdrop: true,
          animation: true,
          keyboard: false,
          closeOnOutsideClick: false,
          backdropClass: "modal-backdrop"
      })
      this.lookupdataArray = data;
      this.rowdata = data;
      this.caption = title;
      this.total = data.length;
      this.ColDefs = colDefsArr;
  }
  close(){
      this.modalService.close(this.modalRef);
      //or this.modalRef.close();
  }

}

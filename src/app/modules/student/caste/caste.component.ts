import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {hdr_Sm_Caste} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {StudentService} from 'src/app/@Core/Services/Student/student.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-caste',
  templateUrl: './caste.component.html',
  styleUrls: ['./caste.component.scss']
})
export class CasteComponent implements OnInit {
  url : any;
  messageerror: any;
  type: any;
  rowdata: any;
  columnDefs: any = [];
  hdr_Caste_Form: any = FormGroup
  hdr_Sm_CasteData: hdr_Sm_Caste = new hdr_Sm_Caste();
  @ViewChild('mycastemodal') mycastemodal?: EcmModalComponent;
  entityId: any;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private stdservice: StudentService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.initilizeGrid();
    this.initilizeForm();
    await this.getHdr_SM_Caste();
  }

  onblur() {
  }

  openModal() {
    this.mycastemodal?.open('lg');
  }

  initilizeGrid() {
    this.columnDefs = [
      {
        field: 'Actions',
        width: 85,
        cellRendererFramework: CellrendererComponent,
        pinned: 'left',
        lockPinned: true,
      },
      {
        headerName: 'S.No',
        valueGetter: "node.rowIndex + 1",
        width: 60,
        resizable: true
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Caste',
        field: 'Caste',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
  }

  initilizeForm() {
    this.hdr_Caste_Form = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Caste: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }

  async getHdr_SM_Caste() {
    this._http.get(this.url + "hdr_SM_Caste/Gethdr_SM_Castes_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

  async Posthdr_SM_CasteData(){
    (this.hdr_Sm_CasteData.Code = this.hdr_Caste_Form?.controls['Code'].value);
    (this.hdr_Sm_CasteData.Caste1 = this.hdr_Caste_Form?.controls['Caste'].value);
    (this.hdr_Sm_CasteData.Description = this.hdr_Caste_Form?.controls['Description'].value);
    (this.hdr_Sm_CasteData.entityId = this.entityId);
    if(!this.hdr_Sm_CasteData.Code || !this.hdr_Sm_CasteData.Caste1) {
     this.dcserror?.open();
     this.type = 4;
     this.messageerror = "1. [ Code ] and [ Caste ] can not be empty!!!"
    } else {
      (await this.stdservice.hdr_SM_Caste(this.hdr_Sm_CasteData)).subscribe((res) => {
        this.hdr_Caste_Form.reset();
        this.getHdr_SM_Caste();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Succesfully.."
      })
    }
  }
 
}

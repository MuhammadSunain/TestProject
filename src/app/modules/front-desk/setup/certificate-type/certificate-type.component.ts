import { AppConstants } from 'src/app/utconstant/app.constant';
import { certificateTypes } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DcsMessageComponent } from 'src/app/components/dcs-message/dcs-error.component';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/@Core/Services/Student/student.service';

@Component({
  selector: 'app-certificate-type',
  templateUrl: './certificate-type.component.html',
  styleUrls: ['./certificate-type.component.scss']
})
export class CertificateTypeComponent implements OnInit {
  url: any;
  rowdata: any;
  messsageerror: any;
  certificateTypes: certificateTypes = new certificateTypes();
  type: any;
  columnDefs: any = [];
  entityId: any;
  myform: any = FormGroup
  @ViewChild('mymodal') mymodal?: EcmModalComponent
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private _http: HttpClient,private frService: FrontdeskService) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.intilizeBasic();
    await this.getcertificateType();
  }

  intilizeBasic() {
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
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Certificate For',
        field: 'CertificateFor',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Certificate Type',
        field: 'certificateType',
        width: 150,
        filter: true,
        floatingFilter: true,
      },
    ];
    this.myform = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      cerfor: new FormControl('', [Validators.required]),
      certype: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }

  openModal() {
    this.mymodal?.open('lg');
  }

  async getcertificateType() {
    this._http.get(this.url + "fr_setup_CertificateType/GetcertificateTypesByEntityId/" + this.entityId).subscribe((res: any) => {
      this.rowdata = res; 
    })
  }

  async SaveFrCertificateType() {
    (this.certificateTypes.Code = this.myform?.controls['Code'].value);
    (this.certificateTypes.CertificateFor = this.myform?.controls['cerfor'].value);
    (this.certificateTypes.CertificateType = this.myform?.controls['certype'].value);
    (this.certificateTypes.Description = this.myform?.controls['Description'].value);
    (this.certificateTypes.entityId = this.entityId);
    (this.certificateTypes.clientId = AppConstants.settings.clientid);
    if(!this.certificateTypes.Code || !this.certificateTypes.CertificateFor || !this.certificateTypes.CertificateType) {
      this.dcserror?.open();
      this.type = 4;
      this.messsageerror = "1. [ Code ] [ Certificate For ] and [ Certificate Type ] can not be empty!!!"
    } else {
      (await this.frService.FR_CertificateType(this.certificateTypes)).subscribe((res) => {
        this.myform.reset();
        this.getcertificateType();
        this.dcserror?.open();
        this.type = 2;
        this.messsageerror = "Record Saved Successfully..."
      })
    }
  }

}

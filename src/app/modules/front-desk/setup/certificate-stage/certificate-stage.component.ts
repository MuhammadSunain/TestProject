import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CaseStages} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
// import { Management } from './../../../../utconstant/dto/data'
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';

@Component({
  selector: 'app-certificate-stage',
  templateUrl: './certificate-stage.component.html',
  styleUrls: ['./certificate-stage.component.scss']
})
export class CertificateStageComponent implements OnInit {
  url: any;
  rowdata: any;
  rowdata2: any;
  caseGroups: any = [];
  CaseStages: CaseStages = new CaseStages();
  messsageerror: any;
  type: any;
  columnDefs: any = [];
  columnDefs2: any = [];
  entityId: any;
  stagetypes: any= [];
  CaseFor: any;
  caseUsers: any = [];
  myform: any = FormGroup;
  casestagesArr: any;
  caseuser: any = "Management";

  @ViewChild('mymodal') mymodal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  
  constructor(private _http: HttpClient,private frService: FrontdeskService) { }

  async ngOnInit(): Promise<void> {
    await this.intilizeBasic();
    this.url = AppConstants.urls.api;
    this.rowdata = []
    this.entityId = localStorage.getItem("Entity");
    // await this.getCaseStages();
    await this.getdata();
    this.caseUsers = [
      { Id: 1, name: "Management" },
      { Id: 2, name: "Parent" },
      { Id: 3, name: "Staff" },
    ];
    this.stagetypes = [
      { Id: 1, Code: "001", name: "Open" },
      { Id: 2, Code: "002", name: "In Process" },
      { Id: 3, Code: "003", name: "Closed" },
    ]
  }

  public async openModal() {
    this.mymodal?.open('lg');
  }

  intilizeBasic() {
    this.casestagesArr = [
      {
        field: '',
        width: 10,
        // pinned: 'left',
        // lockPinned: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Short Name',
        field: 'name',
        width: 140,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ]
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
        headerName: 'Stage Type',
        field: 'CaseType',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Stages',
        field: 'CaseGroup',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Case User',
        field: 'CaseGroup',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.myform = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      caseuser: new FormControl('', [Validators.required]),
      stagetype: new FormControl('',[Validators.required]),
      stages: new FormControl('',[Validators.required]),
      Description: new FormControl('')
    })
  }

  public async getCaseUser(event: any) {
    var abc = event.target.value;
    this.caseuser = abc;
  }

  public async save() {
    debugger
    (this.CaseStages.Code = this.myform?.controls['Code'].value);
    (this.CaseStages.Caseuser = this.caseuser);
    (this.CaseStages.Stagetype = this.myform?.controls['stagetype'].value);
    (this.CaseStages.Stages = this.myform?.controls['stages'].value);
    (this.CaseStages.description = this.myform?.controls['Description'].value);
    (this.CaseStages.clientID = AppConstants.settings.clientid);
    (this.CaseStages.entityId = this.entityId);
    
    if(!this.CaseStages.Code || !this.CaseStages.Stagetype || !this.CaseStages.Stages) {
      this.dcserror?.open();
      this.type = 4;
      this.messsageerror = "1. [ Code ] [ StageType ] and [ Stages ] can not be empty!!!"
    } else {
      if(this.CaseStages.clientID != undefined && this.CaseStages.entityId != undefined || this.CaseStages.clientID != null && this.CaseStages.entityId != null) {
        (await this.frService.FR_CaseStages(this.CaseStages)).subscribe(async (res: any) => {
          this.myform.reset();
          // await this.getdata();
          this.dcserror?.open();
          this.type = 2;
          this.messsageerror = "Record Added Successfully..."
        })
      }
    }

    // console.log(this.CaseStages);

  }

  public async getCaseStages() { 
    debugger
    this._http.get(this.url + "fr_setup_CaseStages/GetCaseStagesByentityId/" + this.entityId).subscribe((res:any) => {
      this.rowdata = res;
    })
  }

  
  async getdata(){
    debugger
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json'}  )
    await this._http.get(this.url + "fr_setup_CaseStages/GetCaseStages", { headers }).subscribe((res: any) => {
      this.rowdata = res;
    })
  }

}

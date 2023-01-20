import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CaseTypes} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {StudentService} from 'src/app/@Core/Services/Student/student.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import { Management } from './../../../../utconstant/dto/data'
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';
import { EntityServiceService } from 'src/app/@Core/Services/Entity/entity-service.service';

@Component({
  selector: 'app-case-type',
  templateUrl: './case-type.component.html',
  styleUrls: ['./case-type.component.scss']
})
export class CaseTypeComponent implements OnInit {
  url: any;
  rowdata: any;
  rowdata2: any;
  caseGroups: any = [];
  CaseTypes: CaseTypes = new CaseTypes();
  messsageerror: any;
  type: any;
  columnDefs: any = [];
  columnDefs2: any = [];
  entityId: any;
  CaseFor: any;
  myform: any = FormGroup;
  casegrpCategridArr: any;
  @ViewChild('mymodal') mymodal?: EcmModalComponent
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private _http: HttpClient,private frService: FrontdeskService, private entitySer:EntityServiceService) { }
  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.intilizeBasic();
    await this.getCaseTypes();
    await this.getCaseGroups();
    this.rowdata2 = Management;
  }

  intilizeBasic() {
    this.casegrpCategridArr = [
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
      headerName: 'Case Group',
      field: 'CaseGroup',
      width: 165,
      filter: true,
      floatingFilter: true,
      resizable: true,
      cellClass: 'br'
    },
    {
      headerName: 'Description',
      field: 'Description',
      width: 190,
      filter: true,
      floatingFilter: true,
      resizable: true
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
        headerName: 'Case Type',
        field: 'CaseType',
        width: 165,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Case Group',
        field: 'CaseGroup',
        width: 165,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.columnDefs2 = [
      {
        field: '',
        width: 20,
        // headerCheckboxSelection: true,
        checkboxSelection: true,
        // cellRendererFramework: CellrendererComponent,
        // pinned: 'left',
        // lockPinned: true,
      },
      {
        headerName: 'S.No',
        valueGetter: "node.rowIndex + 1",
        width: 60,
        resizable: true
      },
      {
        headerName: 'Case User',
        field: 'Name',
        width: 165,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.myform = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      casegrp: new FormControl('', [Validators.required]),
      casetype: new FormControl('',[Validators.required]),
      Description: new FormControl('')
    })
  }

  openModal() {
    this.mymodal?.open('lg');
  }

  selectRow(ev: any) {
    this.CaseFor = ev.data.Name;
  }
  checkbox(ev: any) {
    // console.log(ev);
  }

  async SaveCaseTypes() {
    (this.CaseTypes.Code = this.myform?.controls['Code'].value);
    (this.CaseTypes.CaseGroup = this.myform?.controls['casegrp'].value);
    (this.CaseTypes.CaseType = this.myform?.controls['casetype'].value);
    (this.CaseTypes.Description = this.myform?.controls['Description'].value);
    (this.CaseTypes.entityId = this.entityId);
    (this.CaseTypes.clientId = AppConstants.settings.clientid);
    (this.CaseTypes.CaseFor = this.CaseFor);
    if(!this.CaseTypes.Code || !this.CaseTypes.CaseGroup || !this.CaseTypes.CaseType) {
      this.dcserror?.open();
      this.type = 4;
      this.messsageerror = "1. [ Code ] [ Case Group ] and [ Case Type ] can not be empty!!!"
    } else {
      if(!this.CaseTypes.CaseFor) {
        this.dcserror?.open();
        this.type = 4;
        this.messsageerror = "1. Please Select Case User."
      } else {
        (await this.frService.FR_CaseTypes(this.CaseTypes)).subscribe((res:any) => {
          this.myform.reset();
          this.getCaseTypes();
          this.dcserror?.open();
          this.type = 2;
          this.messsageerror = "Record Saved Successfully..."
        })
      }
    }
  }

  async getCaseTypes() {
    this._http.get(this.url + "fr_caseType/GetCaseTypesByentityId/" + this.entityId).subscribe((res: any) => {
      this.rowdata = res; 
    }) 
  }

  async getCaseGroups() {
    this._http.get(this.url + "fr_case_group/GetCaseGroupsByentityId/" + this.entityId).subscribe((res: any) => {
      this.caseGroups = res; 
    })
  };
}


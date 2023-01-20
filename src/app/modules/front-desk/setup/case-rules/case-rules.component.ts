import { AppConstants } from 'src/app/utconstant/app.constant';
import { CaseRules } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DcsMessageComponent } from 'src/app/components/dcs-message/dcs-error.component';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentService } from 'src/app/@Core/Services/Student/student.service';

@Component({
  selector: 'app-case-rules',
  templateUrl: './case-rules.component.html',
  styleUrls: ['./case-rules.component.scss']
})
export class CaseRulesComponent implements OnInit {
  url: any;
  rowdata: any;
  messageerror: any;
  CaseRules: CaseRules = new CaseRules();
  casetypes: any = [];
  employeedata: any = [];
  caseGroups: any = [];
  casegrpCategridArr: any;
  type: any;
  columnDefs: any = [];
  entityId: any;
  casegroup: any ="";
  myform: any = FormGroup
  @ViewChild('mymodal') mymodal?: EcmModalComponent
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private _http: HttpClient,private frService: FrontdeskService) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.intilizeBasic();
    await this.getcertificateType();
    // await this.getCaseTypes();
    await this.getCaseGroups();
    await this.GET_EMPLOYEE_INFO_ENTITY_WISE();
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
        width: 95,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Case Group',
        field: 'CaseGroup',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Case Type',
        field: 'CaseType',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Case Rule',
        field: 'CaseRule',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Assignee',
        field: 'asignto',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.myform = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      casegrp: new FormControl('', [Validators.required]),
      casetype: new FormControl(''),
      caserule: new FormControl('', [Validators.required]),
      asignto: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }

  async getCaseTypes() {
    this._http.get(this.url + "fr_caseType/GetCaseTypesByentityidandcasegroup/" + this.entityId + "/" + this.casegroup).subscribe((res: any) => {
      this.casetypes = res; 
    }) 
  }

  async getCaseGroups() {
    this._http.get(this.url + "fr_case_group/GetCaseGroupsByentityId/" + this.entityId).subscribe((res: any) => {
      this.caseGroups = res; 
    })
  };

  openModal() {
    this.mymodal?.open('lg');
  }

  async getcertificateType() {
    this._http.get(this.url + "fr_setup_CaseRules/GetcaseRulesByEntityId/" + this.entityId).subscribe((res: any) => {
      this.rowdata = res; 
    })
  }

  async GET_EMPLOYEE_INFO_ENTITY_WISE(){
    this._http.get(this.url + "hdr_HR_EmployeeProfile/Gethdr_HR_EMPLOYEE_InfoByentityId/" + this.entityId).subscribe((res) => {
      this.employeedata = res;
    });
  };

  async getcasegrpWisecasetype(ev: any) {
    this.casegroup = ev.target.value;
    await this.getCaseTypes();
  }

  async Save() {
    (this.CaseRules.Code = this.myform?.controls['Code'].value);
    (this.CaseRules.CaseGroup = this.myform?.controls['casegrp'].value);
    (this.CaseRules.CaseType = this.myform?.controls['casetype'].value);
    (this.CaseRules.CaseRule = this.myform?.controls['caserule'].value);
    (this.CaseRules.Description = this.myform?.controls['Description'].value);
    (this.CaseRules.AssignTo = this.myform?.controls['asignto'].value);
    (this.CaseRules.entityId = this.entityId);
    (this.CaseRules.clientId = AppConstants.settings.clientid);
    if(!this.CaseRules.Code || !this.CaseRules.CaseGroup || !this.CaseRules.CaseRule) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] [ Case Group ] and [ Case Rule ] can not be empty!!!"
    } else {
      if(!this.CaseRules.AssignTo) {
        this.dcserror?.open();
        this.type = 4;
        this.messageerror = "1. Please select the User which to assign the rule."
      } else {
        (await this.frService.FR_CaseRules(this.CaseRules)).subscribe((res) => {
          this.myform.reset();
          this.getcertificateType();
          this.dcserror?.open();
          this.type = 2;
          this.messageerror = "Record Saved Successfully..."
        })
      }
    }
  }

}

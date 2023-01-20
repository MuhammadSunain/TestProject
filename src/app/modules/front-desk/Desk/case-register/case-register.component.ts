import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {caseRegister} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
// import { Management } from './../../../../utconstant/dto/data'
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';
import { EntityServiceService } from 'src/app/@Core/Services/Entity/entity-service.service';


@Component({
  selector: 'case-register',
  templateUrl: './case-register.component.html',
  styleUrls: ['./case-register.component.scss']
})
export class CaseRegisterComponent implements OnInit {

  url: any;
  entities: any = [];
  rowdata: any;
  rowdata2: any;
  caseGroups: any = [];
  caseRegister: caseRegister = new caseRegister();
  messsageerror: any;
  type: any;
  columnDefs: any = [];
  columnDefs2: any = [];
  entityId: any;
  stagetypes: any= [];
  CaseFor: any;
  caseUsers: any = [];
  clientid: any;
  myform: any = FormGroup;
  caption: any;
  reqesterstype: any = [];
  casetypes: any = [];
  stages: any= [];
  requester: any = [];
  reqestertype: any;
  priorities: any = [];
  casegrps: any = [];

  @ViewChild('mymodal') mymodal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  
  constructor(private _http: HttpClient,private frService: FrontdeskService,private entitySer:EntityServiceService) { }

  async ngOnInit(): Promise<void> {
    this.caption = "Case Register"
    this.url = AppConstants.urls.api;
    this.rowdata = [];
    this.clientid = localStorage.getItem("clientid")
    this.entityId = localStorage.getItem("Entity");
    await this.getCaseTypes();
    await this.getEntities();
    await this.getCaseGroups();
    await this.form();
    this.reqesterstype = [
      {Id: 1, txt: "Admin"},
      {Id: 2, txt: "Employee"},
      {Id: 3, txt: "Student"}
    ];
    this.stages = [
      {Id: 1, Code: "All", Stage: "All", Description: "All"},
      {Id: 2, Code: "PEN", Stage: "Pending", Description: "Pending"},
      {Id: 3, Code: "INP", Stage: "In Process", Description: "In Process"},
      {Id: 4, Code: "CLS", Stage: "Closed", Description: "Closed"},
    ];
    this.priorities = [
      {Id: 1, txt: "Low"},
      {Id: 3, txt: "High"},
    ];
  }

  
  public async openModal() {
    this.mymodal?.open('lg');
    this.myform.controls['casedate'].setValue(new Date());
  }

  async getCaseTypes() {
    this._http.get(this.url + "fr_caseType/GetCaseTypesByentityId/" + this.entityId).subscribe((res: any) => {
      this.casetypes = res; 
    }) 
  }

  public async getEntities() {
    this._http.get(this.url + 'Entities/GetEntityById/' + this.clientid).subscribe((res) => {
      this.entities = res;
    });
  }

  public async getCaseGroups() {
    this._http.get(this.url + "fr_case_group/GetCaseGroupsByentityId/" + this.entityId).subscribe((res: any) => {
      this.casegrps = res; 
    })
  };

  public async getValue(ev: any) {
    let value = ev.target.value;
    this.reqestertype = value;
    if(value === "Student") {
      this._http.get(this.url + "hdr_SM_StudentInfo/Gethdr_SM_student_InfoByentityId/" + this.entityId).subscribe((res) => {
        this.requester = res;
      });
    } else if(value === "Employee") {
      this._http.get(this.url + "hdr_HR_EmployeeProfile/Gethdr_HR_EMPLOYEE_InfoByentityId/" + this.entityId).subscribe((res) => {
        this.requester = res;
      });
    }

  }

  form() {
    this.myform = new FormGroup({
      caseid: new FormControl('', [Validators.required]),
      casedate: new FormControl('', [Validators.required]),
      requestertype: new FormControl('', [Validators.required]),
      requester: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
      casegrp: new FormControl('', [Validators.required]),
      casetype: new FormControl('', [Validators.required]),
      priorty: new FormControl('',[Validators.required] ),
      assignto: new FormControl('', [Validators.required]),
      subect: new FormControl('', [Validators.required]),
      txtmessage: new FormControl(''),
      // seriesname: new FormControl(''),
    })
  }

  getreuesterchange() {
    if(this.reqestertype === 'Student') {
      if(this.myform.controls['requester'].value != undefined) {
        let stdrequester = this.myform.controls['requester'].value;
        if(stdrequester) {
          let stdObj = this.requester.filter((o: any) => o.FullName === stdrequester)[0];
          if(stdObj) {
            this.myform.controls['course'].setValue(stdObj.Course);
            this.myform.controls['section'].setValue(stdObj.Section);
          }
        }
      }
    }
  }

}

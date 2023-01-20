import { AppConstants } from 'src/app/utconstant/app.constant';
import { CaseGroups } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DcsMessageComponent } from 'src/app/components/dcs-message/dcs-error.component';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/@Core/Services/Student/student.service';

@Component({
  selector: 'app-case-group',
  templateUrl: './case-group.component.html',
  styleUrls: ['./case-group.component.scss']
})
export class CaseGroupComponent implements OnInit {
  url: any;
  rowdata: any;
  messsageerror: any;
  CaseGroups: CaseGroups = new CaseGroups();
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
    await this.getCaseGroup();
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
        headerName: 'Case Group',
        field: 'CaseGroup',
        width: 165,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.myform = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      casegrp: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }

  openModal() {
    this.mymodal?.open('lg');
  }

  async getCaseGroup() {
    this._http.get(this.url + "fr_case_group/GetCaseGroupsByentityId/" + this.entityId).subscribe((res: any) => {
      this.rowdata = res; 
    })
  }

  async SaveFrCaseGroups() {
    (this.CaseGroups.Code = this.myform?.controls['Code'].value);
    (this.CaseGroups.CaseGroup = this.myform?.controls['casegrp'].value);
    (this.CaseGroups.Description = this.myform?.controls['Description'].value);
    (this.CaseGroups.entityId = this.entityId);
    (this.CaseGroups.clientId = AppConstants.settings.clientid);
    if(!this.CaseGroups.Code || !this.CaseGroups.CaseGroup) {
      this.dcserror?.open();
      this.type = 4;
      this.messsageerror = "1. [ Code ] and [ Case Group ] can not be empty!!!"
    } else {
      (await this.frService.FR_CaseGroups(this.CaseGroups)).subscribe((res) => {
        this.myform.reset();
        this.getCaseGroup();
        this.dcserror?.open();
        this.type = 2;
        this.messsageerror = "Record Saved Successfully..."
      })
    }
  }

}

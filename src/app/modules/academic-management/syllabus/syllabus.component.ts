import { Component, OnInit, ViewChild } from '@angular/core';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {hdr_Ac_Syllabus} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {
  url :any;
  type: any;
  messageerror: any = "";
  rowdata: any;
  columnDefs: any = [];
  hdr_Ac_SyllabusDataForm: any = FormGroup
  hdr_Ac_SyllabusData: hdr_Ac_Syllabus = new hdr_Ac_Syllabus();
  entityId: any;
  @ViewChild('mySyllabusModal') mySyllabusModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient) { }
  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.hdr_Ac_SyllabusDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      SyllabusName: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    });
    await this.gethdr_Ac_Syllabus();
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
        headerName: 'Syllabus',
        field: 'Syllabus',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 260,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
  }

  onblur() {

  }

  async Post_hdr_Ac_SyllabusData(){
    (this.hdr_Ac_SyllabusData.Code = this.hdr_Ac_SyllabusDataForm?.controls['Code'].value);
    (this.hdr_Ac_SyllabusData.Syllabus = this.hdr_Ac_SyllabusDataForm?.controls['SyllabusName'].value);
    (this.hdr_Ac_SyllabusData.Description = this.hdr_Ac_SyllabusDataForm?.controls['Description'].value);
    (this.hdr_Ac_SyllabusData.entityId = this.entityId);
    if(!this.hdr_Ac_SyllabusData.Code || !this.hdr_Ac_SyllabusData.Syllabus) {
       this.dcserror?.open();
       this.type = 4;
       this.messageerror = "1. [ Code ] and [ Syllabus ] cannot be empty !!"
    } else {
      (await this.acadManagementService.hdr_Ac_SyllabusPostApi(this.hdr_Ac_SyllabusData)).subscribe((res) => {
        this.hdr_Ac_SyllabusDataForm.reset();
        this.gethdr_Ac_Syllabus();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully!!";
      })
    }
  }

  openModal() {
    this.mySyllabusModal?.open('lg');
  }

  async gethdr_Ac_Syllabus() {
    this._http.get(this.url + "hdr_Ac_syllabus/Gethdr_Ac_SyllabusByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

}

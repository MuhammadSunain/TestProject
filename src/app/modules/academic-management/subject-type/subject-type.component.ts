import { Component, OnInit, ViewChild } from '@angular/core';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SubjectType} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-subject-type',
  templateUrl: './subject-type.component.html',
  styleUrls: ['./subject-type.component.scss']
})
export class SubjectTypeComponent implements OnInit {
  url : any;
  rowdata: any;
  type: any;
  messageerror: any = "";
  sections: any;
  columnDefs: any = [];
  hdr_Ac_SubjectTypeDataForm: any = FormGroup
  hdr_Ac_SubjectTypeData: SubjectType = new SubjectType();
  entityId: any;
  @ViewChild('mysubtypeModal') mysubtypeModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    await this.gethdr_Ac_SubjectType();
    this.hdr_Ac_SubjectTypeDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      subtype: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    });
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
        headerName: 'Subject Type',
        field: 'SubjectType',
        width: 185,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      // {
      //   headerName: 'Description',
      //   field: 'Description',
      //   width: 260,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true
      // },
    ];
  }
  onblur() {
  }
  openModal() {
    this.mysubtypeModal?.open('lg');
  }

  async Post_hdr_Ac_SubjectTypeData(){
    (this.hdr_Ac_SubjectTypeData.Code = this.hdr_Ac_SubjectTypeDataForm?.controls['Code'].value);
    (this.hdr_Ac_SubjectTypeData.SubjectType = this.hdr_Ac_SubjectTypeDataForm?.controls['subtype'].value);
    (this.hdr_Ac_SubjectTypeData.Description = this.hdr_Ac_SubjectTypeDataForm?.controls['Description'].value);
    (this.hdr_Ac_SubjectTypeData.entityId = this.entityId);
    if(!this.hdr_Ac_SubjectTypeData.Code || !this.hdr_Ac_SubjectTypeData.SubjectType) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] and [ Subject Type ] can not be empty!!!";
    } else {
      (await this.acadManagementService.hdr_Ac_SubjectTypePostApi(this.hdr_Ac_SubjectTypeData)).subscribe((res) => {
        this.hdr_Ac_SubjectTypeDataForm.reset();
        this.gethdr_Ac_SubjectType();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully..."
      })
    }
  }

  async gethdr_Ac_SubjectType() {
    this._http.get(this.url + "hdr_AC_Subject_Type/Gethdr_AC_SubjectType_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

}

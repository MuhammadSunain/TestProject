import { Component, OnInit, ViewChild } from '@angular/core';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SectionGroup} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';


@Component({
  selector: 'app-section-group',
  templateUrl: './section-group.component.html',
  styleUrls: ['./section-group.component.scss']
})
export class SectionGroupComponent implements OnInit {
  url: any;
  type: any;
  sections: any;
  messageerror: any = "";
  rowdata: any;
  columnDefs: any = [];
  hdr_Ac_SectionGroupDataForm: any = FormGroup
  hdr_Ac_SectionGroupData: SectionGroup = new SectionGroup();
  entityId: any;
  sectionlookupArr: any = [];
  @ViewChild('mysectiongroupModal') mysectiongroupModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.hdr_Ac_SectionGroupDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      SectionGroup: new FormControl('', [Validators.required]),
      Section: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    });
    await this.gethdr_Ac_SectionGroup();
    await this.getSections();
    this.sectionlookupArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 95,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Section',
        field: 'Section',
        width: 125,
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
        headerName: 'Section Group',
        field: 'SectionGroup',
        width: 125,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 260,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
  }

  openModal() {
    this.mysectiongroupModal?.open('lg');
  }

  onblur() {
  }

  
  async Post_hdr_Ac_SectionGroupData(){
    (this.hdr_Ac_SectionGroupData.Code = this.hdr_Ac_SectionGroupDataForm?.controls['Code'].value);
    (this.hdr_Ac_SectionGroupData.SectionGroup = this.hdr_Ac_SectionGroupDataForm?.controls['SectionGroup'].value);
    (this.hdr_Ac_SectionGroupData.Sections = this.hdr_Ac_SectionGroupDataForm?.controls['Section'].value);
    (this.hdr_Ac_SectionGroupData.Description = this.hdr_Ac_SectionGroupDataForm?.controls['Description'].value);
    (this.hdr_Ac_SectionGroupData.entityId = this.entityId);
    if(!this.hdr_Ac_SectionGroupData.Code || !this.hdr_Ac_SectionGroupData.SectionGroup) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] and [ Section Group ] can not be empty!!!"
    } else {
      if(!this.hdr_Ac_SectionGroupData.Sections) {
        this.dcserror?.open();
        this.type = 4;
        this.messageerror = "1. [ Section ] can not be empty!!!"
      } else {
        (await this.acadManagementService.hdr_Ac_SectionGroupPostApi(this.hdr_Ac_SectionGroupData)).subscribe((res) => {
          this.hdr_Ac_SectionGroupDataForm.reset();
          this.gethdr_Ac_SectionGroup();
          this.dcserror?.open();
          this.type = 2;
          this.messageerror = "Record Saved Successfully.."
        })
      }
    }
  }

  async gethdr_Ac_SectionGroup() {
    this._http.get(this.url + "hdr_Ac_Section_group/Gethdr_Ac_Section_groupByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

  async getSections() {
    this._http.get(this.url + "hdr_Ac_Section/Gethdr_Ac_SectionByentityId/" + this.entityId).subscribe((res) => {
      this.sections = res;
    })
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Section} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  url: any;
  type: any;
  messageerror: any = "";
  data: any;
  rowdata: any;
  columnDefs: any = [];
  hdr_Ac_SectionDataForm: any = FormGroup
  hdr_Ac_SectionData: Section = new Section();
  entityId: any;
  @ViewChild('mysectionModal') mysectionModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    await this.gethdr_Ac_Section();
    this.hdr_Ac_SectionDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Section: new FormControl('', [Validators.required]),
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
        headerName: 'Section',
        field: 'Section',
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
    this.mysectionModal?.open('lg');
  }

  onblur() {
  }

  async Post_hdr_Ac_sectionData(){
    debugger
    (this.hdr_Ac_SectionData.Code = this.hdr_Ac_SectionDataForm?.controls['Code'].value);
    (this.hdr_Ac_SectionData.Section = this.hdr_Ac_SectionDataForm?.controls['Section'].value);
    (this.hdr_Ac_SectionData.Description = this.hdr_Ac_SectionDataForm?.controls['Description'].value);
    (this.hdr_Ac_SectionData.entityId = this.entityId);
    if(!this.hdr_Ac_SectionData.Code || !this.hdr_Ac_SectionData.Section) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] and [ Section ] cannot be empty !!";
    } else {  
      debugger
      if(this.data.length > 0) {
        var getCode = this.data.filter((o: any) => o.Code === this.hdr_Ac_SectionData.Code);
        if(getCode) {
          this.dcserror?.open();
          this.type = 4;
          this.messageerror = "1. Code [" + this.hdr_Ac_SectionData.Code + "] is already exists !!";
        } else {
          (await this.acadManagementService.hdr_Ac_SectionPostApi(this.hdr_Ac_SectionData)).subscribe((res:any) => {
            this.hdr_Ac_SectionDataForm.reset();
            this.gethdr_Ac_Section();
            this.dcserror?.open();
            this.type = 2;
            this.messageerror = "Record Saved Successfully!!";
          })
        }
      } else {
        (await this.acadManagementService.hdr_Ac_SectionPostApi(this.hdr_Ac_SectionData)).subscribe((res:any) => {
          this.hdr_Ac_SectionDataForm.reset();
          this.gethdr_Ac_Section();
          this.dcserror?.open();
          this.type = 2;
          this.messageerror = "Record Saved Successfully!!";
        })
      }
    }
  }

  async gethdr_Ac_Section() {
    this._http.get(this.url + "hdr_Ac_Section/Gethdr_Ac_SectionByentityId/" + this.entityId).subscribe((res) => {
      this.data = res;
      this.rowdata = res;
    })
  }

}

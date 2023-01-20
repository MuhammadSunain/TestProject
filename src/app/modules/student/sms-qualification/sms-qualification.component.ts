import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {qualification} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {StudentService} from 'src/app/@Core/Services/Student/student.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {AppConstants} from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-sms-qualification',
  templateUrl: './sms-qualification.component.html',
  styleUrls: ['./sms-qualification.component.scss']
})
export class SmsQualificationComponent implements OnInit {
  rowdata: any;
  columnDefs: any;
  type: any;
  QualificationTypes: any;
  qualification_form: any = FormGroup
  messageerror: any;
  qualificationData: qualification = new qualification();
  @ViewChild('mymodal') mymodal?: EcmModalComponent;
  entityId: any;
  url: any;
  qualificationArr: any = [];
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private stdservice: StudentService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.initilizeForm();
    this.initilizeGrid();
    await this.getHdr_qualificationType();
    await this.getHdr_qualification();
  }

  onblur() {}

  openModal() {
    this.mymodal?.open("lg");
  }

  initilizeForm() {
    this.qualification_form = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      qualificationtypeid: new FormControl('', [Validators.required]),
      Qualification: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }

  async Posthdr_SM_qualification(){
    (this.qualificationData.Code = this.qualification_form?.controls['Code'].value);
    (this.qualificationData.qualificationtypeid = this.qualification_form?.controls['qualificationtypeid'].value);
    (this.qualificationData.qualification = this.qualification_form?.controls['Qualification'].value);
    (this.qualificationData.Description = this.qualification_form?.controls['Description'].value);
    (this.qualificationData.entityid = this.entityId);
    if(!this.qualificationData.Code || !this.qualificationData.qualificationtypeid || !this.qualificationData.qualification) {
     this.dcserror?.open();
     this.type = 4;
     this.messageerror = "1. [ Code ] [ Qualification Type ] and [ Qualification ] can not be empty!!!"
    } else {
      (await this.stdservice.SMS_Qualification(this.qualificationData)).subscribe((res) => {
        this.qualification_form.reset();
        this.getHdr_qualification();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Succesfully.."
      })
    }
  }

  async getHdr_qualificationType() {
    this._http.get(this.url + "SmS_QualificationType/getSMS_QualificationType_By_entityId/" + this.entityId).subscribe((res) => {
      this.QualificationTypes = res;
    })
  }
  
  async getHdr_qualification() {
    this._http.get(this.url + "SmS_Qualification/getSMS_Qualification_By_entityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

  initilizeGrid() {
    this.qualificationArr = [
      {
        headerName: '',
        valueGetter: "",
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 105,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Qualification Type',
        field: 'QualificationType',
        width: 200,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 250,
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
        width: 90,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Qualification Type',
        field: 'QualificationType',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Qualification',
        field: 'qualification',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      // {
      //   headerName: 'Description',
      //   field: 'Description',
      //   width: 150,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true
      // },
    ];
  }

}

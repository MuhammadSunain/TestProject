import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {qualificationType} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {StudentService} from 'src/app/@Core/Services/Student/student.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {AppConstants} from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-sms-qualification-type',
  templateUrl: './sms-qualification-type.component.html',
  styleUrls: ['./sms-qualification-type.component.scss']
})
export class SmsQualificationTypeComponent implements OnInit {
  rowdata: any;
  columnDefs: any;
  type: any;
  qualificationType_form: any = FormGroup
  messageerror: any;
  url: any;
  qualificationType: qualificationType = new qualificationType();
  @ViewChild('mymodal') mymodal?: EcmModalComponent;
  entityId: any;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private stdservice: StudentService,private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.initilizeForm();   
    this.initilizeGrid();
    await this.getHdr_qualificationType();
  }

  onblur() {}

  openModal() {
    this.mymodal?.open("lg");
  }

  initilizeForm() {
    this.qualificationType_form = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      qualificationtype: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }

  initilizeGrid() {
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

  async Posthdr_SM_qualificationType(){
    (this.qualificationType.Code = this.qualificationType_form?.controls['Code'].value);
    (this.qualificationType.QualificationType = this.qualificationType_form?.controls['qualificationtype'].value);
    (this.qualificationType.Dexcription = this.qualificationType_form?.controls['Description'].value);
    (this.qualificationType.entityid = this.entityId);
    if(!this.qualificationType.Code || !this.qualificationType.QualificationType) {
     this.dcserror?.open();
     this.type = 4;
     this.messageerror = "1. [ Code ] and [ Qualification Type ] can not be empty!!!"
    } else {
      (await this.stdservice.SMS_QualificationType(this.qualificationType)).subscribe((res) => {
        this.qualificationType_form.reset();
        this.getHdr_qualificationType();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Succesfully.."
      })
    }
  }

  async getHdr_qualificationType() {
    this._http.get(this.url + "SmS_QualificationType/getSMS_QualificationType_By_entityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

}

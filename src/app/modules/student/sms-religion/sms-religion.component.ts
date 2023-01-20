import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Religon} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {StudentService} from 'src/app/@Core/Services/Student/student.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {AppConstants} from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-sms-religion',
  templateUrl: './sms-religion.component.html',
  styleUrls: ['./sms-religion.component.scss']
})
export class SmsReligionComponent implements OnInit {
  rowdata: any;
  columnDefs: any;
  type: any;
  religion_form: any = FormGroup
  messageerror: any;
  religionData: Religon = new Religon();
  @ViewChild('mymodal') mymodal?: EcmModalComponent;
  entityId: any;
  url: any;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private stdservice: StudentService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem('Entity');
    this.initilizeForm();
    this.initilizeGrid();
    await this.getHdr_Religion();
  }

  onblur() {}

  openModal() {
    this.mymodal?.open("lg");
  }

  async Posthdr_SM_RELIGION() {
    (this.religionData.Code = this.religion_form?.controls['Code'].value);
    (this.religionData.Religion = this.religion_form?.controls['religion'].value);
    (this.religionData.Description = this.religion_form?.controls['Description'].value);
    (this.religionData.entityid = this.entityId);
    if(!this.religionData.Code || !this.religionData.Religion) {
     this.dcserror?.open();
     this.type = 4;
     this.messageerror = "1. [ Code ] and [ Religion ] can not be empty!!!"
    } else {
      (await this.stdservice.SMS_Religon(this.religionData)).subscribe((res) => {
        this.religion_form.reset();
        this.getHdr_Religion();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Succesfully.."
      })
    }
  }

  initilizeForm() {
    this.religion_form = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      religion: new FormControl('', [Validators.required]),
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
        width: 98,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Religion',
        field: 'Religion',
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

  async getHdr_Religion() {
    this._http.get(this.url + "SmS_Religion/getSMS_Religion_By_entityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

}

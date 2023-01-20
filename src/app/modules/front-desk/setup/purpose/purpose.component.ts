import { AppConstants } from 'src/app/utconstant/app.constant';
import { Purposes } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DcsMessageComponent } from 'src/app/components/dcs-message/dcs-error.component';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/@Core/Services/Student/student.service';


@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.scss']
})
export class PurposeComponent implements OnInit {

  url: any;
  rowdata: any;
  messsageerror: any;
  Purposes: Purposes = new Purposes();
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
    await this.getPurposes();
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
        headerName: 'Purpose',
        field: 'Purpose',
        width: 165,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 170,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.myform = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      purpose: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }
  openModal() {
    this.mymodal?.open('lg');
  }

  async getPurposes() {
    this._http.get(this.url + "fr_setup_purpose/GetPurposeityId/" + this.entityId).subscribe((res: any) => {
      this.rowdata = res; 
    })
  }

  async POST_FR_SETUP_PURPOSES() {
    (this.Purposes.Code = this.myform?.controls['Code'].value);
    (this.Purposes.Purpose = this.myform?.controls['purpose'].value);
    (this.Purposes.Description = this.myform?.controls['Description'].value);
    (this.Purposes.entityId = this.entityId);
    (this.Purposes.clientId = AppConstants.settings.clientid);
    if(!this.Purposes.Code || !this.Purposes.Purpose) {
      this.dcserror?.open();
      this.type = 4;
      this.messsageerror = "1. [ Code ] and [ Purpose ] can not be empty!!!"
    } else {
      (await this.frService.FR_Purposes(this.Purposes)).subscribe((res) => {
        this.myform.reset();
        this.getPurposes();
        this.dcserror?.open();
        this.type = 2;
        this.messsageerror = "Record Saved Successfully..."
      })
    }
  }

}

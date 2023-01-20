import { AppConstants } from 'src/app/utconstant/app.constant';
import { Sources } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DcsMessageComponent } from 'src/app/components/dcs-message/dcs-error.component';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontdeskService } from 'src/app/@Core/Services/FrontDesk/frontdesk.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/@Core/Services/Student/student.service';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  url: any;
  rowdata: any;
  messsageerror: any;
  Sources: Sources = new Sources();
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
    await this.getSources();
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
        headerName: 'Source',
        field: 'Source',
        width: 165,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 250,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.myform = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      source: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
  }
  openModal() {
    this.mymodal?.open('lg');
  }

  async getSources() {
    this._http.get(this.url + "fr_setup_source/GetSourcesByentityId/" + this.entityId).subscribe((res: any) => {
      this.rowdata = res; 
    })
  }

  async POST_FR_SETUP_SOURCES() {
    (this.Sources.Code = this.myform?.controls['Code'].value);
    (this.Sources.Source = this.myform?.controls['source'].value);
    (this.Sources.Description = this.myform?.controls['Description'].value);
    (this.Sources.entityId = this.entityId);
    (this.Sources.clientId = AppConstants.settings.clientid);
    if(!this.Sources.Code || !this.Sources.Source) {
      this.dcserror?.open();
      this.type = 4;
      this.messsageerror = "1. [ Code ] and [ Source ] can not be empty!!!"
    } else {
      (await this.frService.FR_Sources(this.Sources)).subscribe((res) => {
        this.myform.reset();
        this.getSources();
        this.dcserror?.open();
        this.type = 2;
        this.messsageerror = "Record Saved Successfully..."
      })
    }
  }

}

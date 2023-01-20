import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {state} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {SystemSettingsService} from 'src/app/@Core/Services/system-setting/system-settings.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmLookupComponent} from 'src/app/components/ecm-lookup/ecm-lookup.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {AppConstants} from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  url: any;
  type: any;
  messageerror: any = "";
  columnDefs: any = [];
  ColDefs: any = [];
  Country: any;
  State: any;
  rowdata: any;
  entityId: any;
  systemBasicstateForm: any = FormGroup;
  CountrylookupArr: any = [];
  StateData: state = new state();
  @ViewChild('lookup') lookup?:EcmLookupComponent;
  @ViewChild('mymodal') mymodal?:EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private systemService: SystemSettingsService, private _http: HttpClient) { }
  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.systemBasicstateForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    })
    await this.getCountries();
    await this.getSates();
    this.CountrylookupArr = [
      {
        headerName: 'S.No',
        width: 10,
        resizable: true,
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
        headerName: 'Country',
        field: 'Country',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Dial Code',
        field: 'DialCode',
        width: 115,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ];
    this.ColDefs = [
      {
        field: 'Actions',
        width: 85,
        cellRenderer: CellrendererComponent,
        pinned: 'left',
        lockPinned: true,
      },
      {
        headerName: 'S.No',
        valueGetter: "node.rowIndex + 1",
        width: 60,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'State',
        field: 'State',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      // {
      //   headerName: 'Description',
      //   field: 'Description',
      //   width: 260,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true,
      //   // cellClass: 'br'
      // },
    ];
  }

  onblur() {};

  openModal() {
    this.mymodal?.open();
  }

  async PostStateBasicData(){
    debugger
    (this.StateData.Code = this.systemBasicstateForm?.controls['Code'].value);
    (this.StateData.Country = this.systemBasicstateForm?.controls['country'].value);
    (this.StateData.State1 = this.systemBasicstateForm?.controls['State'].value);
    (this.StateData.Description = this.systemBasicstateForm?.controls['Description'].value);
    (this.StateData.entityId = this.entityId);
    if(!this.StateData.Code || !this.StateData.Country || !this.StateData.State1) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] [ Country ] and [ State ] cannot be empty !!";
    } else {
      (await this.systemService.StatesPostApi(this.StateData)).subscribe(async (res) => {
        this.systemBasicstateForm.reset();
        await this.getSates();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully!!";
      })
    }
  }

  async getCountries() {
    this._http.get(this.url + "ut_Countries/Getut_Country_ByentityId/" + this.entityId).subscribe((res) => {
      this.Country = res;
    });
  }

  async getSates() {
    this._http.get(this.url + "ut_States/Getut_States_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    });
  }

}

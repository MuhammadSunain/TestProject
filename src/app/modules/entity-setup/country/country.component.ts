import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {country} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {SystemSettingsService} from 'src/app/@Core/Services/system-setting/system-settings.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmLookupComponent} from 'src/app/components/ecm-lookup/ecm-lookup.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {AppConstants} from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  url: any;
  type: any;
  messageerror: any = "";
  columnDefs: any = [];
  ColDefs: any = [];
  rowdata: any;
  entityId: any;
  systemBasicCountryForm: any = FormGroup
  CountryData: country = new country();
  @ViewChild('lookup') lookup?:EcmLookupComponent;
  @ViewChild('mymodal') mymodal?:EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private systemService: SystemSettingsService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.systemBasicCountryForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      isoCode: new FormControl('', [Validators.required]),
      dialCode: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
    await this.getCountries();
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
        headerName: 'Country',
        field: 'Country',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'ISO Code',
        field: 'IsoCode',
        width: 115,
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

  async PostCountrybasicData(){
    (this.CountryData.Code = this.systemBasicCountryForm?.controls['Code'].value);
    (this.CountryData.Country1 = this.systemBasicCountryForm?.controls['Country'].value);
    (this.CountryData.isoCode = this.systemBasicCountryForm?.controls['isoCode'].value);
    (this.CountryData.dialCode = this.systemBasicCountryForm?.controls['dialCode'].value);
    (this.CountryData.Description = this.systemBasicCountryForm?.controls['Description'].value);
    (this.CountryData.entityId = this.entityId);
    if(!this.CountryData.Code || !this.CountryData.Country1) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] and [ Country ] cannot be empty !!";
    } else {
      if(!this.CountryData.isoCode || !this.CountryData.dialCode) {
        this.dcserror?.open();
        this.type = 4;
        this.messageerror = "1. [ ISO Code ] and [ Dial Code ] cannot be empty !!";
      } else {
        (await this.systemService.CountriesPostApi(this.CountryData)).subscribe((res) => {
          this.systemBasicCountryForm.reset();
          this.getCountries();
          this.dcserror?.open();
          this.type = 2;
          this.messageerror = "Record Saved Successfully!!";
        })
      }
    }
  }

  async getCountries() {
    this._http.get(this.url + "ut_Countries/Getut_Country_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    });
  }

}

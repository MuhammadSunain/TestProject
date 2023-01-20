import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {city} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {SystemSettingsService} from 'src/app/@Core/Services/system-setting/system-settings.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmLookupComponent} from 'src/app/components/ecm-lookup/ecm-lookup.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {AppConstants} from 'src/app/utconstant/app.constant';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  url: any;
  type: any;
  messageerror: any = "";
  columnDefs: any = [];
  ColDefs: any = [];
  Country: any;
  State: any;
  rowdata: any;
  entityId: any;
  systemBasiccityForm: any = FormGroup
  cityData: city = new city();
  CountrylookupArr: any = [];
  StatelookupArr: any = [];
  @ViewChild('lookup') lookup?:EcmLookupComponent;
  @ViewChild('mymodal') mymodal?:EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private systemService: SystemSettingsService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    await this.getCountries();
    await this.getCities();
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
    this.StatelookupArr = [
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
        headerName: 'State',
        field: 'State',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Country',
        field: 'Country',
        width: 139,
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
        // cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // cellClass: 'br'
      },
      {
        headerName: 'City',
        field: 'City',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // cellClass: 'br'
      },
      {
        headerName: 'Country',
        field: 'Country',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // cellClass: 'br'
      },
      {
        headerName: 'State',
        field: 'State',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // cellClass: 'br'
      },
      {
        headerName: 'DialCode',
        field: '',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // cellClass: 'br'
      },
    ];
    this.systemBasiccityForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    })
  }

  onblur() {};

  openModal() {
    this.mymodal?.open("lg")
  }

  getstates(event: any) { 
    this.getStates(event.target.value);
  }
  async getStates(countryId: any) {
    this._http.get(this.url + "ut_States/Getut_States_ByentityIdandCountryId/" + this.entityId + "/" + countryId).subscribe((res) => {
      this.State = res;
    });
  }

  async getCountries() {
    this._http.get(this.url + "ut_Countries/Getut_Country_ByentityId/" + this.entityId).subscribe((res) => {
      this.Country = res;
    });
  }

  async getCities() {
    this._http.get(this.url + "ut_Cities/Getut_Cities_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    });
  }

  async PostCitybasicData(){
    (this.cityData.Code = this.systemBasiccityForm?.controls['Code'].value);
    (this.cityData.Country = this.systemBasiccityForm?.controls['Country'].value);
    (this.cityData.State = this.systemBasiccityForm?.controls['State'].value);
    (this.cityData.City1 = this.systemBasiccityForm?.controls['City'].value);
    (this.cityData.Description = this.systemBasiccityForm?.controls['Description'].value);
    (this.cityData.entityId = this.entityId);
    if(!this.cityData.Code || !this.cityData.City1) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] and [ City ] cannot be empty !!"
    } else {
      (await this.systemService.CityPostApi(this.cityData)).subscribe((res) => {
        this.systemBasiccityForm.reset();
        this.getCities();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully!!";
      })
    }
  }

}

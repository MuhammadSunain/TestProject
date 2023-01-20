import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {city, state, country} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {SystemSettingsService} from 'src/app/@Core/Services/system-setting/system-settings.service';
import {HttpClient} from '@angular/common/http';
import {EcmLookupComponent} from 'src/app/components/ecm-lookup/ecm-lookup.component';
import { AppConstants } from '../../../utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-system-policies',
  templateUrl: './system-policies.component.html',
  styleUrls: ['./system-policies.component.scss']
})
export class SystemPoliciesComponent implements OnInit {
  url: any;
  CityData: city = new city();
  City: any;
  Country: any;
  State: any
  type: any;
  messageerror: any = "";
  columnDefs: any = [];
  ColDefs: any = [];
  rowdata: any;
  systemBasicCityForm: any = FormGroup
  entityId: any = "";
  systemBasicStateForm: any = FormGroup
  StateData: state = new state();
  total: Number = 0;
  systemBasicCountryForm: any = FormGroup
  CountryData: country = new country();
  @ViewChild('lookup') lookup?:EcmLookupComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  option1 : any = false;
  option2 : any = false;
  option3 : any = false;
  caption: any = "";
  constructor(private systemService:SystemSettingsService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.systemBasicCityForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    })
    this.systemBasicStateForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    })
    this.systemBasicCountryForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      isoCode: new FormControl('', [Validators.required]),
      dialCode: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    })
    await this.getCity();
    await this.getCountries();
  }
  onblur() {

  }

  getstates(event: any) { 
    this.getStates(event.target.value);
  }

  async PostCitybasicData(){
    (this.CityData.Code = this.systemBasicCityForm?.controls['Code'].value);
    (this.CityData.Country = this.systemBasicCityForm?.controls['Country'].value);
    (this.CityData.State = this.systemBasicCityForm?.controls['State'].value);
    (this.CityData.City1 = this.systemBasicCityForm?.controls['City'].value);
    (this.CityData.Description = this.systemBasicCityForm?.controls['Description'].value);
    (this.CityData.entityId = this.entityId);
    if(!this.CityData.Code || !this.CityData.City1) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] and [ City ] cannot be empty !!"
    } else {
      (await this.systemService.CityPostApi(this.CityData)).subscribe((res) => {
        this.systemBasicCityForm.reset();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully!!";
      })
    }
  }

  async PostStateBasicData(){
    (this.StateData.Code = this.systemBasicStateForm?.controls['Code'].value);
    (this.StateData.Country = this.systemBasicStateForm?.controls['country'].value);
    (this.StateData.State1 = this.systemBasicStateForm?.controls['State'].value);
    (this.StateData.Description = this.systemBasicStateForm?.controls['Description'].value);
    (this.StateData.entityId = this.entityId);
    if(!this.StateData.Code || !this.StateData.Country || !this.StateData.State1) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] [ Country ] and [ State ] cannot be empty !!";
    } else {
      (await this.systemService.StatesPostApi(this.StateData)).subscribe((res) => {
        this.systemBasicStateForm.reset();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully!!";
      })
    }
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
      this.messageerror = "1. [ Code ] and [ State ] cannot be empty !!";
    } else {
      if(!this.CountryData.isoCode || !this.CountryData.dialCode) {
        this.dcserror?.open();
        this.type = 4;
        this.messageerror = "1. [ ISO Code ] and [ Dial Code ] cannot be empty !!";
      } else {
        (await this.systemService.CountriesPostApi(this.CountryData)).subscribe((res) => {
          this.systemBasicCountryForm.reset();
          this.dcserror?.open();
          this.type = 2;
          this.messageerror = "Record Saved Successfully!!";
        })
      }
    }
  }

  showOption1() {
    this.option1 = !this.option1;
  }
  showOption2() {
    this.option2 = !this.option2;
  }
  showOption3() {
    this.option3 = !this.option3;
  }

  async showCountryData() {
    this.lookup?.openLookup();
    this.caption = "Country";
    if(this.option1 === true) {
      this.option1 = false;
    }


  }

  async showStateData() {
    this.lookup?.openLookup();
    this.caption = "State";
    if(this.option2 === true) {
      this.option2 = false;
    }
    this.ColDefs = [
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
        width: 210,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 260,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // cellClass: 'br'
      },
    ];
    this._http.get(this.url + "ut_States/Getut_States_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
      this.total = this.rowdata.length;
    });
    // const data = await this.systemService.getAllStates(this.entityId);
    // this.rowdata = data;
    // this.total = this.rowdata.length;
  }

  async showCityData() {
    // debugger
    this.lookup?.openLookup();
    this.caption = "City";
    if(this.option3 === true) {
      this.option3 = false;
    }
    this.ColDefs = [
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
        headerName: 'City',
        field: 'City',
        width: 210,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 260,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // cellClass: 'br'
      },
    ];
    this._http.get(this.url + "ut_Cities/Getut_Cities_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
      this.total = this.rowdata.length;
    });
    // const data = await this.systemService.getAllCities(this.entityId);
    // this.rowdata = data;
    // this.total = this.rowdata.length;
  }

  async getCity() {
    this._http.get(this.url + "ut_Cities/Getut_Cities_ByentityId/" + this.entityId).subscribe((res) => {
      this.City = res;
    });
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


}

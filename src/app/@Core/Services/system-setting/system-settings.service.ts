import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { AppConstants } from '../../../utconstant/app.constant'

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {
  url: any;
  cities: any;
  constructor(private _http: HttpClient) { }

  async CityPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "ut_Cities/Save/ut_City", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async StatesPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "ut_States/Save/ut_States", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async CountriesPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "ut_Countries/Save/ut_Countries", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async getAllCities(entityId: any) {
    var url = AppConstants.urls.api;
    this._http.get<any>(url + "ut_Cities/Getut_Cities_ByentityId/" + entityId).subscribe((res) => {
      return res;
    })
  }

  async getAllStates(entityId: any) {
    var url = AppConstants.urls.api;
    this._http.get<any>(url + "ut_States/Getut_States_ByentityId/" + entityId).subscribe((res) => {
      return res;
    })
  }

}

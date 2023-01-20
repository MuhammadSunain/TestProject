import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from './app.constant'

@Injectable({
  providedIn: 'root'
})
export class ApiactionsService {
  constructor(private _http: HttpClient) {
  }

  async appGetMethod(apiname: any, getapiname: any, entityId: Number) {
    var url = AppConstants.urls.api;
    this._http.get(url + apiname + getapiname + entityId).subscribe((res) => {
      return res;
    })
  }

}

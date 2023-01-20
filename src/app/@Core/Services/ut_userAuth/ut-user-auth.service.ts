import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../utconstant/app.constant';

@Injectable({
  providedIn: 'root'
})
export class UtUserAuthService {

  constructor(private _http: HttpClient) { }

  async ut_userAuth_PostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "ut_User_Auth/Save/ut_User_Auth", data).pipe(map((res:any) => {
      return res;
    }))
  }

}

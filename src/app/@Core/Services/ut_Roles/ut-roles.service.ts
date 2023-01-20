import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../utconstant/app.constant';

@Injectable({
  providedIn: 'root'
})
export class UtRolesService {

  constructor(private _http: HttpClient) { }

  async ut_Roles_PostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "ut_Entity_Roles/Save/ut_Role", data).pipe(map((res:any) => {
      return res;
    }))
  }

}

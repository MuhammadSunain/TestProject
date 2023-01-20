import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../utconstant/app.constant';

@Injectable({
  providedIn: 'root'
})
export class HrServiceService {

  constructor(private _http: HttpClient) {}

  async HR_EmployeeProfile(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'hdr_HR_EmployeeProfile/Save/hdr_hr_employeeData', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}

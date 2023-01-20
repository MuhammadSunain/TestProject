import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../utconstant/app.constant';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  async StdCategoryPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'student_Category/Save/stdCategory', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async hdr_SM_student_InfoPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'hdr_SM_StudentInfo/Save/hdr_SM_studentInfo', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async hdr_SM_Caste(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'hdr_SM_Caste/Save/hdr_SM_caste', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async SMS_QualificationType(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'SmS_QualificationType/Save/sms_Qualificationtype', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async SMS_Qualification(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'SmS_Qualification/Save/sms_Qualification', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async SMS_Religon(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'SmS_Religion/Save/sms_Religion', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../utconstant/app.constant';

@Injectable({
  providedIn: 'root'
})
export class FrontdeskService {
  response: any ;
  constructor(private _http: HttpClient) {}

  async FR_CaseGroups(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'fr_case_group/Save/caseGroup', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async FR_CaseTypes(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'fr_caseType/Save/caseType', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async FR_Sources(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'fr_setup_source/Save/Sources', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async FR_Purposes(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'fr_setup_purpose/Save/Purpose', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async getFR_CaseGroups(entityId: any) {
    var url = AppConstants.urls.api;
    this._http.get(url + "fr_case_group/GetCaseGroupsByentityId/" + entityId).subscribe((res: any) => {
      this.response = res; 
    })
    return this.response;
  }

  async FR_CertificateType(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'fr_setup_CertificateType/Save/CertificateType', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async FR_CaseRules(data: any) {
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'fr_setup_CaseRules/Save/CaseRules', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  async FR_CaseStages(data: any) {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json'}  )
    var url = AppConstants.urls.api;
    return this._http
      .post<any>(url + 'fr_setup_CaseStages/Save/casestage', data, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}

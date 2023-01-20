import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { AppConstants } from '../../../utconstant/app.constant'

@Injectable({
  providedIn: 'root'
})
export class EntityServiceService {
  // entity: any;
  entityId:any = "";
  entityName:any = "";
  constructor(private _http: HttpClient) {}

  async EntityPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "Entities/Save/Entity", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async Entity_TypePostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "Entities_Type/Save/entity_Type", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async getEntities() {
    var url = AppConstants.urls.api;
    var clientid = AppConstants.settings.clientid;
    var res;
    this._http.get(url + 'Entities/GetEntityById/' + clientid).subscribe((res) => {
      res = res;
    });
    return res
  }

}

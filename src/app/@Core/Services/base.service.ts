import { Injectable } from '@angular/core';
import { AppConstants } from '../../utconstant/app.constant'

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  clientid: any;
  rowid: any;
  clientlogo: any;

  getClientLogo() {
    this.clientid = AppConstants.settings.clientid;
    if(this.clientid === 1) {
      this.clientlogo = "../../../assets/header/school-logo.png";
    } else if(this.clientid === 3) {
      this.clientlogo = "../../../assets/login/edpedap.png";
    } else if(this.clientid === 4) {
      this.clientlogo = "../../../assets/login/logos/psh.png";
    } else if(this.clientid === 5) {
      this.clientlogo = "../../../assets/login/logos/01.png"
    }
  }

}

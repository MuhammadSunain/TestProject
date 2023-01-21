import { Component, ViewChild } from '@angular/core';
import {EcmModalComponent} from './components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AppConstants } from './utconstant/app.constant';
import { LocalStorage } from './utconstant/LocalStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecom-app';
  EntityForm: any = FormGroup;

  constructor(
    private localstorage: LocalStorage
  ){}

  ngOnInit() {
    var clientId = AppConstants.settings.clientid;
    localStorage.setItem('clientid', String(clientId))
    this.localstorage.set('apiUrl', AppConstants.urls.api)
    this.localstorage.set('apiUtUrl', AppConstants.urls.ut)
  }
  
  getvalue() {
    var value = this.EntityForm?.controls['Code'].value;
    alert(value);
  }

}

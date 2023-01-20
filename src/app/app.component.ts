import { Component, ViewChild } from '@angular/core';
import {EcmModalComponent} from './components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AppConstants } from './utconstant/app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecom-app';
  EntityForm: any = FormGroup;

  ngOnInit() {
    var clientId = AppConstants.settings.clientid;
    localStorage.setItem('clientid', String(clientId))
    this.EntityForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
    })
  }
  
  getvalue() {
    var value = this.EntityForm?.controls['Code'].value;
    alert(value);
  }

}

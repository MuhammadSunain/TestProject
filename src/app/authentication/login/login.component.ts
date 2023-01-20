import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EntityServiceService } from 'src/app/@Core/Services/Entity/entity-service.service';
import { BaseService } from 'src/app/@Core/Services/base.service';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { DcsMessageComponent } from 'src/app/components/dcs-message/dcs-error.component';
import { AppConstants } from '../../utconstant/app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  input1: any = true;
  type: any;
  showlogintext:any = true;
  clientid: any;
  messageerror: any = '';
  input2: any = true;
  input3: any = false;
  loginform: any = FormGroup;
  EntityName = '';
  Entities: any = '';
  ut_Users: any;
  logo: any;
  EntityLoginName: any;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private entityService: EntityServiceService,
    private _http: HttpClient,
    private baseService: BaseService
  ) {}
  @ViewChild('forgetModal') forgetModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  async ngOnInit(): Promise<void> {
    this.clientid = AppConstants.settings.clientid;
    this.loginform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    // await this.getEntities();
    this.baseService.getClientLogo();
    this.logo = this.baseService.clientlogo;
    this.getUsers(this.clientid);
  }

  openForgetPasswordModal() {
    this.forgetModal?.open('md');
  }

  // async checkLogin() {
  //   this._http.get('http://localhost:2216/api/ut_User_Auth/GetAll').subscribe((res: any) => {
  //       let filterArr = res.filter((o: any) => o.Username == this.loginform?.controls['username'].value && o.Password == this.loginform?.controls['password'].value)[0];
  //       if(filterArr === undefined || filterArr === null) {
  //         this.dcserror?.open();
  //         this.type = 4;
  //         this.messageerror = "1. Invalid username or password.";
  //       }
  //       this.entityService.entityId = filterArr.entityId;
  //       this.entityService.entityName = filterArr.Entity;
  //       this.EntityName = filterArr.Entity;
  //       localStorage.setItem('Entity', this.entityService.entityId);
  //       localStorage.setItem('EntityName', this.entityService.entityName);
  //       const user = res.find((o: any) => { return ( o.Username == this.loginform?.controls['username'].value && o.Password == this.loginform?.controls['password'].value);});
  //       if (user) {
  //         this.input1 = false;
  //         this.input2 = false;
  //         this.input3 = true;
  //       } else {

  //       }
  //     });
  // }

  async checkLogin() {
    if(this.ut_Users === undefined || this.ut_Users === null || this.ut_Users.length === 0) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = '1. Something went wrong please try again later.';
    }
    let filterArr = this.ut_Users.filter((o: any) => o.Username == this.loginform?.controls['username'].value && o.Password == this.loginform?.controls['password'].value )[0];
    if (filterArr === undefined || filterArr === null) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = '1. Invalid username or password.';
    }
    this.entityService.entityId = filterArr.entityid;
    this.entityService.entityName = filterArr.Entity;
    const user = this.ut_Users.find((o: any) => {return (o.Username == this.loginform?.controls['username'].value && o.Password == this.loginform?.controls['password'].value); });
    if (user) {
      this.input1 = false;
      this.input2 = false;
      this.input3 = true;
      this.showlogintext = false;
      await this.getEntity(filterArr.entityid);
    } else {
    }
  }

  async getEntity(clientid: any) {
    this._http.get('http://localhost:2216/api/Entities/GetEntityById/' + clientid).subscribe((res) => {
      this.Entities = res;
    });
  }

  async getUsers(clientid: any) {
    this._http.get('http://localhost:2216/api/ut_User_Auth/Getut_Users_auth_ByclientId/' + clientid).subscribe((res) => {
      this.ut_Users = res;
    });
  }

  // async getLoginEntity(entityid: any) {
    
  // }
  
  loginEntityWise(event: any) {
    const abc = event.target.value;
    this.router.navigate(['Dashboard/AttendenceDashboard']);
    localStorage.setItem('Entity', abc);
    this._http.get('http://localhost:2216/api/Entities/GetEntityByIdandid/' + abc).subscribe((res:any) => {
      var nameForStd = res.filter((d:any) => d.entityId)[0];
      localStorage.setItem('EntityName', nameForStd.EntityName);
    });
  }

}

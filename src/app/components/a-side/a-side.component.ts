import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { EntityServiceService } from '../../@Core/Services/Entity/entity-service.service';
import {BaseService} from 'src/app/@Core/Services/base.service';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from '../../utconstant/app.constant'
import { DcsDeleteComponent } from '../dcs-delete/dcs-delete.component';
import { LocalStorage } from 'src/app/utconstant/LocalStorage';

@Component({
  selector: 'a-side',
  templateUrl: './a-side.component.html',
  styleUrls: ['./a-side.component.scss']
})
export class ASideComponent implements OnInit {
  entityName: any = '';
  currentTime: any;
  input1: any = true;
  input2: any = true;
  input3: any = false;
  loginform: any = FormGroup;
  EntityName = '';
  Entities: any = '';
  clientid: any;
  logo:any;
  screens: any = [];
  @Input() getScreens: any = [];
  currentUrl: any = "";
  showlogbtn: any = true;
  @ViewChild('changeEntityModal') changeEntityModal?: EcmModalComponent;
  @ViewChild('confrimlogoutModal') confrimlogoutModal? : DcsDeleteComponent;
  constructor(
    private entityService: EntityServiceService,
    private _http: HttpClient,
    private router: Router,
    private baseService: BaseService,
    private localstorage: LocalStorage
  ) {
    setInterval(() => {
      const currentDate = new Date();
      this.currentTime = currentDate.toLocaleTimeString();
    }, 1000);
  }

  async ngOnInit(): Promise<void> {
    this.currentUrl = this.router.url;
    this.clientid = AppConstants.settings.clientid;
    this.entityName = localStorage.getItem('EntityName');
    if (window.top) window.top.document.title = 'EDAP - MODULES';
    this.baseService.getClientLogo();
    this.logo = this.baseService.clientlogo;
    this.screens = this.getScreens;
  }

  ChangeEntityModal() {
    this.changeEntityModal?.open('md');
  }

  toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    let main = document.getElementById('main');
    sidebar?.classList.toggle('active');
    main?.classList.toggle('active');
    if(this.showlogbtn === true) {
      this.showlogbtn = false;
    } else [
      this.showlogbtn = true
    ]
  }

  openLogout() {
    this.confrimlogoutModal?.open();
  }

  logout() {
    this.router.navigate(['/authentication/login']);
    this.localstorage.remove('token')
  }

}

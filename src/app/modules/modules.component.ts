import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { EntityServiceService } from '../@Core/Services/Entity/entity-service.service';
import {BaseService} from 'src/app/@Core/Services/base.service';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from '../utconstant/app.constant';
import { DcsDeleteComponent } from '../components/dcs-delete/dcs-delete.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})

export class ModulesComponent implements OnInit {
  screens: any = [];

  @ViewChild('dcsdelete') dcsdelete?: DcsDeleteComponent;

  constructor(
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.screens = [
          {
            id: 1,
            modulename: 'System Settings',
            routerLink: '/Modules/SystemSetting',
            moduleimg: '../../assets/modulesicons/1.svg',
            classActive: 'active',
          },
          {
            id: 2,
            modulename: 'Entity Setup',
            routerLink: '/Modules/EntitySetup',
            moduleimg: '../../assets/modulesicons/2.svg',
          },
          {
            id: 3,
            modulename: ' Front Desk ',
            routerLink: '/Modules/FrontDesk',
            moduleimg: '../../assets/modulesicons/front_office.svg',
          },
          {
            id: 4,
            modulename: ' Academic Management ',
            moduleimg: '../../assets/modulesicons/3.svg',
            routerLink: '/Modules/AcademicManagement',
          },
          {
            id: 5,
            modulename: 'Student Management',
            routerLink: '/Modules/StudentManagement',
            moduleimg: '../../assets/modulesicons/4.svg',
          },
          {
            id: 6,
            modulename: ' Human Resource ',
            routerLink: '/Modules/HumanResource',
            moduleimg: '../../assets/modulesicons/hr.svg',
          },
          {
            id: 7,
            modulename: 'User Management',
            routerLink: '/Modules/UserManagement',
            moduleimg: '../../assets/modulesicons/5.svg',
          },
          
        ];
  }

  open() {
    this.dcsdelete?.open();
  }

}

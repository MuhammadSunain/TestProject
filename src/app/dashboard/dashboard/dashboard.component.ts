import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {EntityServiceService} from 'src/app/@Core/Services/Entity/entity-service.service';
import {BaseService} from 'src/app/@Core/Services/base.service';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from '../../utconstant/app.constant'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  screens: any = [];
  @ViewChild('changeEntityModal') changeEntityModal?: EcmModalComponent;
  // currentDate: any = new Date().toDateString();
  constructor() {
   }

   async ngOnInit(): Promise<void> {
    this.screens = [
      {
        id: 1,
        modulename: 'Attendance',
        routerLink: '/Dashboard/AttendenceDashboard',
        moduleimg: '../../assets/modulesicons/attendicon.svg',
        classActive: 'active',
      },
      // {
      //   id: 2,
      //   modulename: 'Time Table',
      //   routerLink: '/Dashboard/AttendenceDashboard',
      //   moduleimg: '../../assets/modulesicons/attendicon.svg',
      // },
      // {
      //   id: 3,
      //   modulename: 'Course Coverage',
      //   routerLink: '/Dashboard/AttendenceDashboard',
      //   moduleimg: '../../assets/modulesicons/attendicon.svg',
      // },
      // {
      //   id: 4,
      //   modulename: 'Revenue',
      //   routerLink: '/Dashboard/AttendenceDashboard',
      //   moduleimg: '../../assets/modulesicons/attendicon.svg',
      // },
      // {
      //   id: 5,
      //   modulename: 'Examination',
      //   routerLink: '/Dashboard/AttendenceDashboard',
      //   moduleimg: '../../assets/modulesicons/attendicon.svg',
      // },
      {
        id: 6,
        modulename: 'Complaints',
        routerLink: '/Dashboard/hdr_SMComplaint',
        moduleimg: '../../assets/modulesicons/complaintsicon.svg',
      }
    ];
  }
}

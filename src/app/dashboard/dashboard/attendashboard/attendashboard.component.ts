import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-attendashboard',
  templateUrl: './attendashboard.component.html',
  styleUrls: ['./attendashboard.component.scss']
})
export class AttendashboardComponent implements OnInit {
  dashboarddate: any;
  constructor() { }

  ngOnInit(): void {
    var dateFormat = "DD-MMM-YYYY"
    var dt = moment(new Date()).format(dateFormat);
    this.dashboarddate = dt;
  }

  refreshDashboard() {
    this.ngOnInit();
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-complains-dashboard',
  templateUrl: './complains-dashboard.component.html',
  styleUrls: ['./complains-dashboard.component.scss']
})
export class ComplainsDashboardComponent implements OnInit {
  gaugeType: any;
  gaugeValue: any;
  rowdata: any = [];
  entityId: any = 0;
  gaugeLabel:any;
  columnDefs2: any = [];
  url: any = "";
  caseGroups: any = [];
  
  gaugeAppendText:any;
  @ViewChild('casestatusmodal')casestatusmodal?: EcmModalComponent
  constructor(private _http:HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.gaugeType = "semi";
    this.gaugeValue = 30;
    this.gaugeLabel = "Closed";
    this.gaugeAppendText = "%";
    this.getCharts();
    await this.getData();
    this.columnDefs2 = [
      {
        headerName: 'Case Type',
        field: 'Name',
        width: 165,
        // filter: true,
        // floatingFilter: true,
        // resizable: true
      },
      {
        headerName: 'Case Type',
        field: 'Name',
        width: 165,
        // filter: true,
        // floatingFilter: true,
        // resizable: true
      },
      {
        headerName: 'Case Type',
        field: 'Name',
        width: 165,
        // filter: true,
        // floatingFilter: true,
        // resizable: true
      },
    ];
    this.rowdata  = [];
  }

  async getCharts() {
    var myChart = new Chart('casestatuschart', {
      type: 'doughnut',
      data: {
          labels: ['Open', 'In Process', 'Close'],
          datasets: [{
              label: '# of Votes',
              data: [87,10,3],
              backgroundColor: [
                  '#d00000',
                  '#fbf23b',
                  '#40916c'
              ],
              borderColor: [
                  '#d00000',
                  '#fbf23b',
                  '#40916c'
              ],
              borderWidth: 1
          }]
      },
  });
  var myChart2 = new Chart('caselastsixmonthchart', {
    type: 'bar',
    data: {
        labels: ['01-July', '01-Aug', '01-Sep','01-Oct', '01-Nov', '01-Dec'],
        datasets: [{
            label: 'Total Complaints',
            data: [87,10,3, 78, 18, 54],
            backgroundColor: [
              '#2b92d5',
              '#2b92d5',
              '#2b92d5',
              '#2b92d5',
              '#2b92d5',
              '#2b92d5'
            ],
            borderColor: [
              '#2b92d5',
              '#2b92d5',
              '#2b92d5',
              '#2b92d5',
              '#2b92d5',
              '#2b92d5'
            ],
            borderWidth: 1
        }]
    },
});
var myChart3 = new Chart('casegroupschart', {
  type: 'doughnut',
  data: {
      labels: ['Unfair Treatment', 'Academics', 'Cleaning And Sweeping'],
      datasets: [{
          label: 'Total Complaints',
          data: [43,81,27],
          backgroundColor: [
            '#d00000',
            '#2b92d5',
            '#40916c'
          ],
          borderColor: [
            '#d00000',
            '#2b92d5',
            '#40916c'
          ],
          borderWidth: 1
      }]
  },
});
var myChart4 = new Chart('caselastsevendayshchart', {
  type: 'line',
  data: {
      labels: ['23-Dec', '24-Dec', '25-Dec', '26-Dec', '27-Dec', '28-Dec', '29-Dec'],
      datasets: [{
          label: 'Total Complaints',
          data: [43,81,27,7, 32, 49, 71],
          backgroundColor: [
            '#2b92d5',
          ],
          borderColor: [
            '#2b92d5',
          ],
          borderWidth: 1
      }]
  },
});
  }

  openCaseStatusModal() {
    this.casestatusmodal?.open('md');
  }

  public async getData() {
    this._http.get(this.url + "fr_case_group/GetCaseGroupsByentityId/" + this.entityId).subscribe((res: any) => {
      this.caseGroups = res; 
    })
  }

}

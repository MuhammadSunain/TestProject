import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import 'ag-grid-community/';
import { ColDef, GridApi } from 'ag-grid-community/';
import {EmployeeProfileComponent} from 'src/app/modules/human-resource/employee-profile/employee-profile.component';

@Component({
  selector: 'ecm-ag-grid',
  templateUrl: './ecm-ag-grid.component.html',
  styleUrls: ['./ecm-ag-grid.component.scss'],
})
export class EcmAgGridComponent implements OnInit {
  @Input()
  headerheight: any; 
  @Input()
  mode: any = 1;
  headheight: any;
  @Input()
  rowSelection: any = 'multiple';
  @Input()
  rowData: any = '';
  @Input()
  headerHeight: any;
  @Output('rowDbClicked')
  rowDbClicked: EventEmitter<any> = new EventEmitter();
  @Output('selectedRowClick')
  selectedRowClick: EventEmitter<any> = new EventEmitter();
  @Output('rowClicked')
  rowClicked: EventEmitter<any> = new EventEmitter();
  @Output('check')
  Check: EventEmitter<any> = new EventEmitter();
  @Output('cellbtnClick')
  cellbtnClick: EventEmitter<any> = new EventEmitter();
  @Output('onCellClick')
  onCellClick: EventEmitter<any> = new EventEmitter();
  @Input()
  pagination = true;
  @Input()
  defRight: any = 5;
  @Input()
  _columns: ColDef[] = [];
  @Input()
  top: any = 90 + 'px';
  @Input()
  right: any = 5 + 'px';
  private gridApi!: GridApi;
  rowHeight: number = 28;
  height: any;
  @Input()
  rowselect = true;
  @Input()
  defaultHeight: any;
  params: any = '';
  @Input()
  routerLinkForRefreash: any;
  @ViewChild('screen') screen?: EmployeeProfileComponent;
  // overlayNoRowsTemplate: any;
  overlayNoRowsTemplate = "<img src='../../../assets/norecordfoundblue.png' style='height: 195px; '></img>";
  @Input()
  hidenoRecordFound: any;  
  constructor() {}

  ngOnInit(): void {
    this.height = this.defaultHeight + 'px';
    // this.headheight = this.headerheight + 'px';
    // if(this.hidenoRecordFound === true) {
    //   this.overlayNoRowsTemplate = "<img src='../../../assets/norecordfoundblue.png' style='height: 195px; '></img>";
    // } else {
    //   this.overlayNoRowsTemplate = "";
    // }
  }

  onFilterChanged(event: any) {
    // console.log(event);
  }

  onGridReady(event: any) {
    this.gridApi = event.api;
    this.params = event;
  }

  FilterShow() {
    debugger;
    this.params.columnApi.columnModel.columnDefs.floatingFilter = false;
    this.params.columnApi.columnModel.columnDefs.filter = false;
  }

  async openOnDbClick(event: any) {
    this.rowDbClicked.emit(event);
  }

  async openOnClick(event: any) {
    this.rowClicked.emit(event);
  }

  async getRows(e: any) {
    if (e.target.value == 5) {
      this.height = 200 + 'px';
    }
    if (e.target.value == 10) {
      this.height = 350 + 'px';
    }
    if (e.target.value == 15) {
      this.height = 510 + 'px';
    }
    if (e.target.value == 20) {
      this.height = 630 + 'px';
    }
    if (e.target.value == 50) {
      this.height = 1465 + 'px';
    }
  }

  async onRowSelected(event: any) {
    this.selectedRowClick.emit(event);
  }  

  async check(event: any) {
    if(this.mode == 2) {
      this.Check.emit(event);
    }
  }

  async cellButtonClickEvent(event: any) {
    this.cellbtnClick.emit(event);
  }

  onCellClicked(ev: any) {
    // console.log('onCellClicked:>>>', ev);
    this.onCellClick.emit(ev);
  }

  refresh() {
    this.screen?.ngOnInit();
  }

  DownloadToExcel() {
    this.gridApi.exportDataAsExcel();
  }

}

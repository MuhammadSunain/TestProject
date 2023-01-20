import { Component, OnInit } from '@angular/core';
import {CellButtons} from './buttos';
import { AgRendererComponent } from "ag-grid-angular";
import {ICellRendererParams} from 'ag-grid-community';
import {SharedServiceService} from 'src/app/modules/student/class-attendence/shared/shared-service.service';

@Component({
  selector: 'app-cell-buttos',
  templateUrl: './cell-buttos.component.html',
  styleUrls: ['./cell-buttos.component.scss']
})
export class CellButtosComponent implements AgRendererComponent {
  params: any;
  buttons: CellButtons[] = [];
  date: any;
  cellButtons: any = [];
  constructor(private sharedService: SharedServiceService) { }

  ngOnInit(): void {
    console.log(this.buttons)
    this.cellButtons = [
      { Id: 1, Caption: "P", colorcode: "#40916C", Function: "" },
      { Id: 2, Caption: "A", colorcode: "#D00000",  Function: "" },
      { Id: 3, Caption: "L", colorcode: "#FB8500",  Function: "" },
      { Id: 4, Caption: "LV", colorcode: "#FFEE32",  Function: "" },
      { Id: 5, Caption: "AO", colorcode: "#2B92D5",  Function: "" },
      { Id: 6, Caption: "H", colorcode: "#F59BAD",  Function: "" },
      { Id: 7, Caption: "SL", colorcode: "#954535",  Function: "" },
    ];
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    // this.params = params;
    // this.buttons =
    //   this.params && this.params.colDef && this.params.colDef.buttons;
    // this.date =
    //   this.params && this.params.colDef && this.params.colDef.date;
  }


  refresh(params?: any): boolean {
    return true;
  }

  markAttendance() {
    this.sharedService.sendClickEvent(this.params);
  }

}

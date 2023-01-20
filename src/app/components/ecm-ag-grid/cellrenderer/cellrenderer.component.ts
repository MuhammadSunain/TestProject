import {HttpClient} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import { BaseService } from 'src/app/@Core/Services/base.service';
import {SharedServiceService} from 'src/app/modules/student/class-attendence/shared/shared-service.service';

@Component({
  selector: 'app-cellrenderer',
  templateUrl: './cellrenderer.component.html',
  styleUrls: ['./cellrenderer.component.scss']
})
export class CellrendererComponent implements AgRendererComponent{
  params:any;
  delETE:any
  message: any;
  id: any;
  @Input() data:any;
  constructor( private _http: HttpClient, private sharedService: SharedServiceService, private baseser: BaseService) { }
  getValue()
  {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.delETE = params.data.id;
    this.data = params.data;
    this.id = params.data.entityId
    this.baseser.rowid = this.id;
  } 

  refresh(params: any) {
    return false;
  }

  deleteFunction() {
    this.sharedService.sendClickEvent(this.params);
  }
   
  deleterecord : boolean = false
}

import {HttpClient} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {AgRendererComponent, ICellEditorAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-student-pic',
  templateUrl: './student-pic.component.html',
  styleUrls: ['./student-pic.component.scss']
})
export class StudentPicComponent implements AgRendererComponent {
  params:any;
  delETE:any
  message: any;
  @Input() data:any;
  constructor( private _http: HttpClient) { }
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
  } 

  refresh(params: any) {
    return true
  }

   
  deleterecord : boolean = false

}

import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Entity_Type} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {EntityServiceService} from 'src/app/@Core/Services/Entity/entity-service.service';
import {DcsDeleteComponent} from 'src/app/components/dcs-delete/dcs-delete.component';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from '../../../utconstant/app.constant'
import {SharedServiceService} from '../../student/class-attendence/shared/shared-service.service';

@Component({
  selector: 'app-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.scss']
})
export class EntityTypeComponent implements OnInit {
  rowdata: any;
  type: any;
  message: any;
  deleteFunction: Subscription;
  url: any;
  columnDefs: any = [];
  Entity_TypeForm: any = FormGroup;
  rowid: any;
  Entity_TypeData: Entity_Type = new Entity_Type();
  @ViewChild('EntityTypeModal') EntityTypeModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror? : DcsMessageComponent;
  @ViewChild('dcsdelete') dcsdelete? : DcsDeleteComponent
  constructor(private _http: HttpClient, private entity: EntityServiceService, private sharedService: SharedServiceService) { 
    this.deleteFunction = this.sharedService.getClickEvent().subscribe(() => {
      this.delete();
    })
  }

  delete () {
    this.dcsdelete?.open();
  }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.columnDefs = [
      {
        field: 'Actions',
        width: 85,
        cellRenderer: CellrendererComponent,
        pinned: 'left',
        lockPinned: true,
      },
      {
        headerName: 'S.No',
        valueGetter: "node.rowIndex + 1",
        width: 60,
        resizable: true
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Type',
        field: 'Type',
        width: 210,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 260,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.Entity_TypeForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Type: new FormControl('', [Validators.required]),
      Description: new FormControl(''),
    })
    await this.getEntities_Types();
  }

  openModal() {
    this.EntityTypeModal?.open('lg');
  }

  onblur() {

  }

  async PostEntity_TypeData() {
    (this.Entity_TypeData.Code = this.Entity_TypeForm?.controls['Code'].value);
    (this.Entity_TypeData.Type = this.Entity_TypeForm?.controls['Type'].value);
    (this.Entity_TypeData.Description = this.Entity_TypeForm?.controls['Description'].value);
    if(!this.Entity_TypeData.Code || !this.Entity_TypeData.Type ) {
      this.dcserror?.open();
      this.type = 4;
      this.message = "1. [ Code ] and [ Type ] cannot be empty!!";
    } else {
      (await this.entity.Entity_TypePostApi(this.Entity_TypeData)).subscribe((res) => {
        this.Entity_TypeForm.reset();
        this.dcserror?.open();
        this.type = 2;
        this.message = "Record Saved Successfully...";
        this.getEntities_Types();
      })
    }
  }

  async getEntities_Types() {
    this._http.get(this.url + 'Entities_Type/GetEntities_Type').subscribe((res) => {
      this.rowdata = res;
    });
  }

  async deleteentitytype() {
    this._http.delete(this.url + "Entities_Type/Delete/" + this.rowid).subscribe((res) => {
      alert("Record Deleted Successfully...");
      this.getEntities_Types();
    })
  }

  getRowID(event: any) {
    this.rowid = event.data.Id;
  }

}

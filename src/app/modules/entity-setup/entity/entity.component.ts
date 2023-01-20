import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import {Entity} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {EntityServiceService} from 'src/app/@Core/Services/Entity/entity-service.service';
import { DcsDeleteComponent } from 'src/app/components/dcs-delete/dcs-delete.component';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {GridBarsIconComponent} from 'src/app/components/ecm-ag-grid/grid-bars-icon/grid-bars-icon.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import { SharedServiceService } from '../../student/class-attendence/shared/shared-service.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  rowdata: any;
  url :any;
  type: any;
  deletefunction: Subscription
  messageerror: any;
  clientid: any;
  Entity_Type: any;
  columnDefs: any = [];
  EntityForm: any = FormGroup
  EntityData: Entity = new Entity();
  entitytypeArr: any = [];
  constructor(private _http: HttpClient, private entity: EntityServiceService, private sharedSer: SharedServiceService) {
    this.deletefunction = this.sharedSer.getClickEvent().subscribe((res: any) => {
      this.opendeleteModal();
    })
  }

  opendeleteModal() {
    this.delete?.open();
  }

  @ViewChild('EntityModal') EntityModal?: EcmModalComponent
  @ViewChild('dcsdelete') delete?: DcsDeleteComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.clientid = AppConstants.settings.clientid;
    this.columnDefs = [
      {
        field: 'Actions',
        width: 85,
        cellRendererFramework: CellrendererComponent,
        // cellRendererParams: (params:any) => {
        //  return alert(params.data.Code)
        // },
        pinned: 'left',
        lockPinned: true,
      },
      {
        field: 'entityId',
        // headerName: 'S.No',
        // valueGetter: "node.rowIndex + 1",
        // width: 70,
        // resizable: true,
        hide: true
      },
      {
        headerName: 'S.No',
        valueGetter: "node.rowIndex + 1",
        width: 70,
        resizable: true
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 85,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Entity Name',
        field: 'EntityName',
        width: 200,
        filter: true,
        floatingFilter: true,
        resizable: true
      },

      {
        headerName: 'Est. Date',
        field: 'EntityDate',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true
      },

      {
        headerName: 'Entity Type',
        field: 'EntityType',
        width: 170,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Contact No',
        field: 'contsctno',
        width: 135,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.entitytypeArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Type',
        field: 'Type',
        width: 210,
        filter: true,
        floatingFilter: true,
        resizable: true,
      }
    ];
    await this.getEntities();
    await this.getEntities_Types();
    this.EntityForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      EntityName: new FormControl('', [Validators.required]),
      EntityType: new FormControl('', [Validators.required]),
      EntityDate: new FormControl('', [Validators.required]),
      ownerName: new FormControl('', [Validators.required]),
      contsctno: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      address: new FormControl('', [Validators.required]),
    })
  }

  async getEntities() {
    this._http.get(this.url + 'Entities/GetEntityById/' + this.clientid).subscribe((res) => {
      this.rowdata = res;
    });
  }

  openModal() {
    this.EntityModal?.open('lg');
  }

  async PostEntityData() {
    (this.EntityData.Code = this.EntityForm?.controls['Code'].value);
    (this.EntityData.EntityName = this.EntityForm?.controls['EntityName'].value);
    (this.EntityData.EntityType = this.EntityForm?.controls['EntityType'].value);
    (this.EntityData.EntityDate = this.EntityForm?.controls['EntityDate'].value);
    (this.EntityData.ownerName = this.EntityForm?.controls['ownerName'].value);
    (this.EntityData.contsctno = this.EntityForm?.controls['contsctno'].value);
    (this.EntityData.email = this.EntityForm?.controls['email'].value);
    (this.EntityData.address = this.EntityForm?.controls['address'].value);
    (this.EntityData.clientid = this.clientid);
    if(!this.EntityData.Code || !this.EntityData.EntityName || !this.EntityData.EntityType || !this.EntityData.EntityDate || !this.EntityData.ownerName || !this.EntityData.contsctno || !this.EntityData.address) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] [ EntityName ] [ EntityType ] [ EntityDate ] [ ownerName ] [ Contact No ] and [ Address ] cannot be empty!!!"
    } else {
      (await this.entity.EntityPostApi(this.EntityData)).subscribe((res) => {
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully..."
        this.EntityForm.reset();
        this.getEntities();
      })
    }
  }

  // this.entitytypeArr = [
  //   {
  //     field: 'Actions',
  //     width: 85,
  //     cellRenderer: CellrendererComponent,
  //     pinned: 'left',
  //     lockPinned: true,
  //   },
  //   {
  //     headerName: 'S.No',
  //     valueGetter: "node.rowIndex + 1",
  //     width: 60,
  //     resizable: true
  //   },
  //   {
  //     headerName: 'Code',
  //     field: 'Code',
  //     width: 120,
  //     filter: true,
  //     floatingFilter: true,
  //     resizable: true
  //   },
  //   {
  //     headerName: 'Type',
  //     field: 'Type',
  //     width: 210,
  //     filter: true,
  //     floatingFilter: true,
  //     resizable: true
  //   },
  //   {
  //     headerName: 'Description',
  //     field: 'Description',
  //     width: 260,
  //     filter: true,
  //     floatingFilter: true,
  //     resizable: true
  //   },
  // ];
  onblur() {

  }

  async getEntities_Types() {
    this._http.get(this.url + 'Entities_Type/GetEntities_Type').subscribe((res) => {
      this.Entity_Type = res;
    });
  }

  id: any = "1";

  tabChange(ids: any) {
    this.id = ids;
  } 

  


}

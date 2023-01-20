import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ut_Roles} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {UtRolesService} from 'src/app/@Core/Services/ut_Roles/ut-roles.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  url: any;
  rowdata: any;
  rowdata2: any;
  ut_Roles_Form: any = FormGroup
  ut_Roles_Data: ut_Roles = new ut_Roles();
  entityId :any ;
  Entities: any;
  columnDefs: any = [];
  columnDefss: any = [];
  entityName: any;
  modules: any;
  @ViewChild('myEntityRole') myEntityRole?: EcmModalComponent;
  screensType: any = [];
  showWrites: any = false;
  constructor(private _http: HttpClient, private ut_service: UtRolesService) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem('Entity');
    this.entityName = localStorage.getItem('EntityName');
    this.ut_Roles_Form = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Role1: new FormControl('', [Validators.required]),
      Entity: new FormControl('', [Validators.required]),
      entityId: new FormControl('', [Validators.required])
    })
    await this.get_ut_Roles(AppConstants.settings.clientid);
    await this.getCurrentClient(AppConstants.settings.clientid);
    await this.getEntities();
    this.columnDefs = [
      {
        field: 'Actions',
        width: 85,
        cellRendererFramework: CellrendererComponent,
        pinned: 'left',
        lockPinned: true,
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
        headerName: 'Role',
        field: 'Role',
        width: 130,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Client',
        field: 'Entity',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.columnDefss = [
      {
        field: '',
        width: 15,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        // pinned: 'left',
        // lockPinned: true,
        cellClass: 'br',
        resizable: true
      },
      {
        headerName: 'S.No',
        valueGetter: "node.rowIndex + 1",
        width: 60,
        resizable: true
      },
      {
        headerName: 'Modules',
        field: 'module',
        width: 245,
        filter: true,
        floatingFilter: true,
        resizable: true
      }
    ];
    this.screensType = [
      {id: 1, typeName: "Screens"},
      {id: 2, typeName: "Dashboard"},
      // {id: 3, typeName: "Screens"},
    ];
    this.rowdata2 = [
      {id: 1,module: " System Settings"},
      {id: 2,module: "  Entity Setup"},
      {id: 3,module: " Academic Management"},
      {id: 4,module: " Student Management"},
      {id: 5,module: " User Management"},
    ]
  }

  onblur() {

  }

  openModal() {
    this.myEntityRole?.open("xl");
  }

  async Post_ut_Roles(){
    (this.ut_Roles_Data.Code = this.ut_Roles_Form?.controls['Code'].value);
    (this.ut_Roles_Data.Role1 = this.ut_Roles_Form?.controls['Role1'].value);
    (this.ut_Roles_Data.client = this.ut_Roles_Form?.controls['Entity'].value);
    (this.ut_Roles_Data.entityId = this.entityId);
    if(!this.ut_Roles_Data.Code || !this.ut_Roles_Data.Role1 || !this.ut_Roles_Data.client) {
      alert("Please Fill The Data!!")
    } else {
      (await this.ut_service.ut_Roles_PostApi(this.ut_Roles_Data)).subscribe((res) => {
        this.ut_Roles_Form.reset();
        this.get_ut_Roles(AppConstants.settings.clientid);
      })
    }
  }

  async get_ut_Roles(clientid: Number) {
    this._http.get(this.url + "ut_Entity_Roles/Getut_Roles_ByentityId/" + clientid).subscribe((res) => {
      this.rowdata = res;
    })
  }

  async getEntities() {
    this._http.get("http://localhost:2216/api/Entities/GetEntities").subscribe((res) => {
      this.Entities = res;
    })
  }

  showwrites(event: any) {
    this.showWrites = true;
  }

  changeCategories(event: any) {
    var value = event.target.value;
    if(value === "Dashboard") {
      this.rowdata2 = [
        {id: 1,module: "Attendance"},
      ]
    } else {
      this.rowdata2 = [
        {id: 1,module: " System Settings"},
        {id: 2,module: "  Entity Setup"},
        {id: 3,module: " Academic Management"},
        {id: 4,module: " Student Management"},
        {id: 5,module: " User Management"},
      ]
    }
  }

  selectRow(event:any) {
    console.log(event)
  }

  saveModules() {
    // console.log(this.modules)
  } 

  checkbox(event: any) {
    console.log(event);
  }

  async getCurrentClient(clientid: Number) {
    this._http.get(this.url + "ut_client/getut_clients_by_Id/" + clientid).subscribe((res) => {
      this.entityName = res;
    })
  }

}

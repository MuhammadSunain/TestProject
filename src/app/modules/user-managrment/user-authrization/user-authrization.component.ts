import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ut_User_Auth} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {UtRolesService} from 'src/app/@Core/Services/ut_Roles/ut-roles.service';
import {UtUserAuthService} from 'src/app/@Core/Services/ut_userAuth/ut-user-auth.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-user-authrization',
  templateUrl: './user-authrization.component.html',
  styleUrls: ['./user-authrization.component.scss']
})
export class UserAuthrizationComponent implements OnInit {
  url: any;
  rowdata: any;
  Entities: any;
  rowdata2: any;
  entityId:any;
  clientid: Number = 0;
  columnDefs2: any = [];
  Roles: any;
  columnDefs: any = [];
  disabled: any = true;
  ut_User_Auth_Form: any = FormGroup
  ut_User_Auth_Data: ut_User_Auth = new ut_User_Auth();
  entityName: any;
  userCategory: any = [];
  userCategoryArr: any = [];
  rolesGridArr: any = [];
  userEntitiesIds: any = [];

  @ViewChild('myUserAuthModal') myUserAuthModal?: EcmModalComponent
  constructor(private _http: HttpClient, private ut_service: UtRolesService, private utUserAuthService:UtUserAuthService) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.clientid = AppConstants.settings.clientid;
    this.entityId = localStorage.getItem("Entity");
    // this.entityName = localStorage.getItem("EntityName")
    this.ut_User_Auth_Form = new FormGroup({
      Client: new FormControl(""),
      username: new FormControl('', [Validators.required]),
      pass: new FormControl('',[Validators.required]),
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl(''),
      CellNo: new FormControl(''),
      UserCategory: new FormControl('', [Validators.required]),
      Role: new FormControl('', [Validators.required]),
      Status: new FormControl('', [Validators.required]),
    })
    await this.get_ut_Roles();
    await this.getEntities();
    await this.getut_User_DAta();
    await this.getCurrentClient(AppConstants.settings.clientid);
    await this.getEntitiesrow();
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
        width: 60,
        resizable: true
      },
      // {
      //   headerName: 'Entity',
      //   field: 'Entity',
      //   width: 230,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true
      // },
      {
        headerName: 'User Name',
        field: 'Username',
        width: 190,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Fullname',
        field: 'Fullname',
        width: 220,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      // {
      //   headerName: 'Email',
      //   field: 'Email',
      //   width: 180,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true
      // },
      // {
      //   headerName: 'Cell No',
      //   field: 'CellNo',
      //   width: 120,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true
      // },
      {
        headerName: 'User Category',
        field: 'UserCategory',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Role',
        field: 'Role',
        width: 140,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Status',
        field: 'Status',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.userCategory = [
      {
        Id: 1,
        Code: "ADM",
        name: "Admin",
        Reference: "Admin"
      },
      {
        Id: 2,
        Code: "EMP",
        name: "Employee",
        Reference: "Employee"
      },
      {
        Id: 3,
        Code: "PRN",
        name: "Parent",
        Reference: "Parent"
      },
      {
        Id: 4,
        Code: "STU",
        name: "Student",
        Reference: "Student"
      },
    ]
    this.userCategoryArr = [
      {
        headerName: '',
        valueGetter: "",
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 200,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 200,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Reference',
        field: 'Reference',
        width: 200,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ]
    this.rolesGridArr = [
      {
        headerName: '',
        valueGetter: "",
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 170,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Role',
        field: 'Role',
        width: 170,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Client',
        field: 'client',
        width: 230,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ]
    this.columnDefs2 = [
      {
        field: '',
        width: 20,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        // cellRendererFramework: CellrendererComponent,
        // pinned: 'left',
        // lockPinned: true,
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 100,
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
    ];
  }

  onblur() { }

  id: any = "1";

  tabChange(ids: any) {
    this.id = ids;
  } 

  async ut_User_Auth_Data_Post() {
    debugger
    (this.ut_User_Auth_Data.clientid = this.ut_User_Auth_Form?.controls['Client'].value);
    (this.ut_User_Auth_Data.Username = this.ut_User_Auth_Form?.controls['username'].value);
    (this.ut_User_Auth_Data.Password = this.ut_User_Auth_Form?.controls['pass'].value);
    (this.ut_User_Auth_Data.Fullname = this.ut_User_Auth_Form?.controls['Fullname'].value);
    (this.ut_User_Auth_Data.Email = this.ut_User_Auth_Form?.controls['Email'].value);
    (this.ut_User_Auth_Data.CellNo = this.ut_User_Auth_Form?.controls['CellNo'].value);
    (this.ut_User_Auth_Data.UserCategory = this.ut_User_Auth_Form?.controls['UserCategory'].value);
    (this.ut_User_Auth_Data.Role = this.ut_User_Auth_Form?.controls['Role'].value);
    (this.ut_User_Auth_Data.Status = this.ut_User_Auth_Form?.controls['Status'].value);
    (this.ut_User_Auth_Data.entityId = this.entityId);
    if (!this.ut_User_Auth_Data.clientid || !this.ut_User_Auth_Data.Username || !this.ut_User_Auth_Data.Password || !this.ut_User_Auth_Data.Fullname || !this.ut_User_Auth_Data.UserCategory || !this.ut_User_Auth_Data.Role || !this.ut_User_Auth_Data.Status) {
      alert("Sorry!!");
    } else {
      (await this.utUserAuthService.ut_userAuth_PostApi(this.ut_User_Auth_Data)).subscribe((res) => {
        this.ut_User_Auth_Form.reset();
        this.getut_User_DAta();
      })
    }
  }

  async get_ut_Roles() {
    this._http.get(this.url + "ut_Entity_Roles/Get_ut_Roles").subscribe((res) => {
      this.Roles = res;
    })
  }

  async getEntities() {
    this._http.get(this.url + "Entities/GetEntities").subscribe((res) => {
      this.Entities = res;
    })
  }

  async getut_User_DAta() {
    this._http.get(this.url + "ut_User_Auth/Getut_Users_auth_ByclientId/" + this.clientid).subscribe((res) => {
      this.rowdata = res;
    })
  }

  openModal() {
    this.myUserAuthModal?.open("lg");
    // var client = this.entityName;
    // var clientname;
    // client.array.forEach((ele:any) => {
    //   clientname = ele.client;
    // });
    // this.ut_User_Auth_Form?.controls["Client"].setValue(clientname);
  }

  async getCurrentClient(clientid: Number) {
    this._http.get(this.url + "ut_client/getut_clients_by_Id/" + clientid).subscribe((res) => {
      this.entityName = res;
    })
  }

  selectRow(ev: any) {
    var id = 0;
    console.log(ev.data.entityId);
    ev.data.forEach((ids: any) => {
      
    });
  }
  checkbox(ev: any) {
    // console.log(ev);
  }

  async getEntitiesrow() {
    this._http.get(this.url + 'Entities/GetEntityById/' + this.clientid).subscribe((res) => {
      this.rowdata2 = res;
    });
  }

}

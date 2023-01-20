import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {employeeData} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HrServiceService} from 'src/app/@Core/Services/HumanResourse/hr-service.service';
import {UtRolesService} from 'src/app/@Core/Services/ut_Roles/ut-roles.service';
import {UtUserAuthService} from 'src/app/@Core/Services/ut_userAuth/ut-user-auth.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import { filter } from 'rxjs/operators';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  currentEntity: any;
  url : any;
  messageerror: any;
  type: any;
  rowdata: any = [];
  Entities: any;
  entityId:any;
  id: any = "1";
  Roles: any;
  religions: any;
  columnDefs: any = [];
  disabled: any = true;
  stdCategory: any;
  countries: any;
  coursename: any = "";
  States: any;
  Cities: any;
  Syllabus: any;
  Courses: any;
  Sections: any;
  SectionGroup: any;
  nameForStudentId : any = "ECM";
  hdr_HR_Employee_Info_form: any = FormGroup;
  hdr_HR_employee_Info_Data: employeeData = new employeeData();
  @ViewChild('mymodal') mymodal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror? : DcsMessageComponent;
  constructor(private _http: HttpClient, private hr_Service: HrServiceService) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.currentEntity = localStorage.getItem("EntityName")
    await this.getCountries();
    await this.getCities();
    await this.getReligions();
    this.intilizegrid();
    this.initilizeForm();
    await this.GET_EMPLOYEE_INFO_ENTITY_WISE();
  }

  openModal() {
    this.mymodal?.open("lg");
  };

  onblur() {};

  tabChange(ids: any) {
    this.id = ids;
  } 

  async getCountries() {
    this._http.get(this.url + 'ut_Countries/Getut_Country_ByentityId/' + this.entityId).subscribe((res) => {
      this.countries = res;
    })
  }

  async getCities(){
    this._http.get(this.url + "ut_Cities/Getut_Cities_ByentityId/" + this.entityId).subscribe((res) => {
      this.Cities = res;
    });
  };

  async getReligions(){
    this._http.get(this.url + "SmS_Religion/getSMS_Religion_By_entityId/" + this.entityId).subscribe((res) => {
      this.religions = res;
    });
  };

  initilizeForm() {
    this.hdr_HR_Employee_Info_form = new FormGroup({
      // empid: new FormControl(''),
      shrotcode: new FormControl(''),
      machinecode: new FormControl(''),
      joindate: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      dateofbirth: new FormControl('',[Validators.required]),
      Gender: new FormControl('',[Validators.required]),
      bloodgroup: new FormControl(''),
      CNIC: new FormControl('',[Validators.required]),
      birthcountry: new FormControl(''),
      birthcity: new FormControl(''),
      nationality: new FormControl(''),
      religion: new FormControl(''),
      email: new FormControl(''),
      contactno: new FormControl('',[Validators.required]),
      whatsappno: new FormControl(''),
      emptype: new FormControl('',[Validators.required]),
      empcategory: new FormControl('',[Validators.required]),
      empdepartment: new FormControl('',[Validators.required]),
      empdestination: new FormControl('',[Validators.required]),
      site: new FormControl('',[Validators.required]),
    });
  }
  intilizegrid() {
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
        resizable: true,
      },
      {
        headerName: 'Employee ID',
        field: 'empid',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Machine Code',
        field: 'machinecode',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Joining Date',
        field: 'joindate',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Employee Name',
        field: 'firstname',
        width: 210,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Department',
        field: 'empdepartment',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Category',
        field: 'empcategory',
        width: 95,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Designation',
        field: 'empdestination',
        width: 118,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
       {
        headerName: 'Contact No',
        field: 'contactno',
        width: 95,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ];
  }

  async Save_Hr_employee_profile_data () {
    debugger
    var currentdate = new Date().toDateString();
    var numForemployeeId = Math.floor(Math.random() * 1000000);
    this.hdr_HR_employee_Info_Data.empid = numForemployeeId;
    // BasicInformation
    (this.hdr_HR_employee_Info_Data.shrotcode = this.hdr_HR_Employee_Info_form?.controls['shrotcode'].value);
    (this.hdr_HR_employee_Info_Data.machinecode = this.hdr_HR_Employee_Info_form?.controls['machinecode'].value);
    (this.hdr_HR_employee_Info_Data.joindate = this.hdr_HR_Employee_Info_form?.controls['joindate'].value);
    (this.hdr_HR_employee_Info_Data.firstname = this.hdr_HR_Employee_Info_form?.controls['firstname'].value);
    (this.hdr_HR_employee_Info_Data.lastname = this.hdr_HR_Employee_Info_form?.controls['lastname'].value);
    (this.hdr_HR_employee_Info_Data.dateofbirth = this.hdr_HR_Employee_Info_form?.controls['dateofbirth'].value);
    (this.hdr_HR_employee_Info_Data.Gender = this.hdr_HR_Employee_Info_form?.controls['Gender'].value);
    (this.hdr_HR_employee_Info_Data.bloodgroup = this.hdr_HR_Employee_Info_form?.controls['bloodgroup'].value);
    // Personal info
    (this.hdr_HR_employee_Info_Data.CNIC = this.hdr_HR_Employee_Info_form?.controls['CNIC'].value);
    (this.hdr_HR_employee_Info_Data.birthcountry = this.hdr_HR_Employee_Info_form?.controls['birthcountry'].value);
    (this.hdr_HR_employee_Info_Data.birthcity = this.hdr_HR_Employee_Info_form?.controls['birthcity'].value);
    (this.hdr_HR_employee_Info_Data.nationality = this.hdr_HR_Employee_Info_form?.controls['nationality'].value);
    (this.hdr_HR_employee_Info_Data.religion = this.hdr_HR_Employee_Info_form?.controls['religion'].value);
    (this.hdr_HR_employee_Info_Data.email = this.hdr_HR_Employee_Info_form?.controls['email'].value);
    (this.hdr_HR_employee_Info_Data.contactno = this.hdr_HR_Employee_Info_form?.controls['contactno'].value);
    (this.hdr_HR_employee_Info_Data.whatsappno = this.hdr_HR_Employee_Info_form?.controls['whatsappno'].value);
    // Employment info
    (this.hdr_HR_employee_Info_Data.emptype = this.hdr_HR_Employee_Info_form?.controls['emptype'].value);
    (this.hdr_HR_employee_Info_Data.empcategory = this.hdr_HR_Employee_Info_form?.controls['empcategory'].value);
    (this.hdr_HR_employee_Info_Data.empdepartment = this.hdr_HR_Employee_Info_form?.controls['empthisdepartment'].value);
    (this.hdr_HR_employee_Info_Data.empdestination = this.hdr_HR_Employee_Info_form?.controls['empdestination'].value);
    (this.hdr_HR_employee_Info_Data.site = this.hdr_HR_Employee_Info_form?.controls['site'].value);
    (this.hdr_HR_employee_Info_Data.entityId = this.entityId);
    (this.hdr_HR_employee_Info_Data.clientId = AppConstants.settings.clientid);
    debugger
    // conditions
    if(!this.hdr_HR_employee_Info_Data.empid || !this.hdr_HR_employee_Info_Data.firstname || !this.hdr_HR_employee_Info_Data.lastname || !this.hdr_HR_employee_Info_Data.dateofbirth || !this.hdr_HR_employee_Info_Data.Gender || !this.hdr_HR_employee_Info_Data.CNIC || !this.hdr_HR_employee_Info_Data.nationality || !this.hdr_HR_employee_Info_Data.contactno ) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. Personal Information cannot be empty!!!"
    } else {
      if(!this.hdr_HR_employee_Info_Data.emptype || !this.hdr_HR_employee_Info_Data.empcategory || !this.hdr_HR_employee_Info_Data.empdepartment || !this.hdr_HR_employee_Info_Data.empdestination || !this.hdr_HR_employee_Info_Data.site) {
        this.dcserror?.open();
        this.type = 4;
        this.messageerror = "1.  Employment cannot be empty!!!"
      } else {
        (await this.hr_Service.HR_EmployeeProfile(this.hdr_HR_employee_Info_Data)).subscribe((res) => {
          this.hdr_HR_Employee_Info_form.reset();
          this.GET_EMPLOYEE_INFO_ENTITY_WISE();
          this.id = "1";
          this.dcserror?.open();
          this.type = 2;
          this.messageerror = "Record Saved Successfully..";
        })
      }
      // this.dcserror?.open();
      // this.type = 2;
      // this.messageerror = "1. EmployeeId created successfully..."
      // console.log(this.hdr_HR_employee_Info_Data)
    }
  }

  async GET_EMPLOYEE_INFO_ENTITY_WISE(){
    this._http.get(this.url + "hdr_HR_EmployeeProfile/Gethdr_HR_EMPLOYEE_InfoByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    });
  };


}

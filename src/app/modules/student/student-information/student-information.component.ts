import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {studentInfo} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {StudentService} from 'src/app/@Core/Services/Student/student.service';
import {UtRolesService} from 'src/app/@Core/Services/ut_Roles/ut-roles.service';
import {UtUserAuthService} from 'src/app/@Core/Services/ut_userAuth/ut-user-auth.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import { filter } from 'rxjs/operators';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import { SmsQualificationComponent } from '../sms-qualification/sms-qualification.component';

@Component({
  selector: 'student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.scss']
})
export class StudentInformationComponent implements OnInit {
  url : any;
  messageerror: any;
  type: any;
  rowdata: any;
  Entities: any;
  entityId:any;
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
  nameForStudentId : any = "";
  stdCategridArr: any = [];
  countryGridArr: any = [];
  @ViewChild('mystudentInfoModal') mystudentInfoModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror? : DcsMessageComponent;
  hdr_SM_student_Info_form: any = FormGroup
  hdr_SM_student_Info_Data: studentInfo = new studentInfo();
  entityName: any;
  gender: any = [];
  gendergridArr: any = [];
  religiongridArr: any = [];
  stategridArr: any = [];
  citygridArr: any = [];
  syllabusArr: any = [];
  courseArr: any = [];
  sectiongridArr: any = [];
  sectiongroupgridArr: any = [];
  constructor(private _http: HttpClient, private studentService: StudentService) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.entityName = localStorage.getItem("EntityName");
    this.initilizeForm();
    this.initilizeGrid();
    await this.getStdCategory();
    await this.getCountries();
    await this.getStates();
    await this.getCities();
    await this.getSyllabus();
    await this.getReligions();
    // await this.getCourse();
    await this.getSection();
    await this.getStudententityWise();
    await this.getLoginEntity();
  }

  async getLoginEntity() {
    this._http.get(this.url + "Entities/GetEntityByIdandid/" + this.entityId).subscribe((res:any) => {
      var entObj = res[0];
      this.nameForStudentId = entObj.Code;
    })
  }

  openModal() {
    this.mystudentInfoModal?.open("lg");
    this.hdr_SM_student_Info_form?.controls["AdmissionDate"].setValue(new Date());
  }

  onblur() {
  }
  
  id: any = "1";
  AdmissionDate: any;

  tabChange(ids: any) {
    this.id = ids;
  } 

  async getStdCategory() {
    this._http.get(this.url + "student_Category/GetStdCategoryByentityId/" + this.entityId).subscribe((res) => {
      this.stdCategory = res;
    })
  };

  async getCountries(){
    this._http.get(this.url + "ut_Countries/Getut_Country_ByentityId/" + this.entityId).subscribe((res) => {
      this.countries = res;
    });
  };

  async getReligions(){
    this._http.get(this.url + "SmS_Religion/getSMS_Religion_By_entityId/" + this.entityId).subscribe((res) => {
      this.religions = res;
    });
  };

  async getStates(){
    this._http.get(this.url + "ut_States/Getut_States_ByentityId/" + this.entityId).subscribe((res) => {
      this.States = res;
    });
  };

  async getCities(){
    this._http.get(this.url + "ut_Cities/Getut_Cities_ByentityId/" + this.entityId).subscribe((res) => {
      this.Cities = res;
    });
  };

  async getSyllabus(){
    this._http.get(this.url + "hdr_Ac_syllabus/Gethdr_Ac_SyllabusByentityId/" + this.entityId).subscribe((res) => {
      this.Syllabus = res;
    });
  };

  async gethdr_Ac_Course(syllabusId: any) {
    this._http.get(this.url + "hdr_Ac_Course/Gethdr_Ac_CourseByentityId_and_Syllabus/" + this.entityId + "/" + syllabusId).subscribe((res) => {
      this.Courses = res;
    })
  }

  async getSection(){
    this._http.get(this.url + "hdr_Ac_Section/Gethdr_Ac_SectionByentityId/" + this.entityId).subscribe((res) => {
      this.Sections = res;
    });
  };

  async getSectionGroup(sectionid: any){
    this._http.get(this.url + "hdr_Ac_Section_group/Gethdr_Ac_Section_groupByentityIdandSectionId/" + this.entityId + "/" + sectionid).subscribe((res) => {
      this.SectionGroup = res;
    });
  };

  async getsectionWisesectiongroup(a: any) {
    var abc = a.target.value;
    await this.getSectionGroup(abc);
  }

  async getSyllabusWiseCourses(b:any) {
    let abc = b.target.value;
    await this.gethdr_Ac_Course(abc);
    this.coursename = abc;
  }

  initilizeForm() {
    this.hdr_SM_student_Info_form = new FormGroup({
      // Basic Info
      GRno: new FormControl(''),
      stdcategory: new FormControl(''),
      Fullname: new FormControl('', [Validators.required]),
      lastname: new FormControl(''),
      dateofbirth: new FormControl('', [Validators.required]),
      CNIC: new FormControl(''),
      Nationality: new FormControl('', [Validators.required]),
      Gender: new FormControl('', [Validators.required]),
      Religion: new FormControl("", [Validators.required]),
      // Contact info
      Address: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      State: new FormControl('', [Validators.required]),
      City: new FormControl('', [Validators.required]),
      PhoneNo: new FormControl(''),
      MobileNo: new FormControl("", [Validators.required]),
      Email: new FormControl("", [Validators.email]),
      // Academics info
      JoiningDate: new FormControl('', [Validators.required]),
      AdmissionDate: new FormControl(''),
      Syllabus: new FormControl('', [Validators.required]),
      Course: new FormControl('', [Validators.required]),
      Section: new FormControl('', [Validators.required]),
      SectionGroup: new FormControl(''),
      // father info
      fathname: new FormControl('', [Validators.required]),
      FathersIncome: new FormControl(''),
      fathcontactno: new FormControl('', [Validators.required]),
      fathcnic: new FormControl('', [Validators.required]),
      fathwhatsappno: new FormControl(''),
      fathEmail: new FormControl(''),
      fathAddress: new FormControl(''),
      fathCountry: new FormControl(''),
      fathState: new FormControl(''),
      fathCity: new FormControl(''),
      // mother info
      mothname: new FormControl(''),
      mothcontactno: new FormControl(''),
      mothcnic: new FormControl(''),
      mothwhatsappno: new FormControl(''),
      mothEmail: new FormControl(''),
      mothAddress: new FormControl(''),
      mothCountry: new FormControl(''),
      mothState: new FormControl(''),
      mothCity: new FormControl(''),
      // emergency info
      Relation: new FormControl(''),
      emername: new FormControl(''),
      emerCNIC: new FormControl(''),
      emerContactNo: new FormControl(''),
    });
  }

  async POST_hdr_SM_student_Info() {
    debugger
    var date = new Date().toDateString();
    var numforstudentId = Math.floor(Math.random() * 10000);
    (this.hdr_SM_student_Info_Data.StudentID = this.nameForStudentId + "-" + numforstudentId);
    if(this.hdr_SM_student_Info_form?.controls['GRno'].value === "") {
      var getrandomgrno = Math.floor(Math.random() * 10000)
      this.hdr_SM_student_Info_Data.grno = getrandomgrno;
    } else {
      (this.hdr_SM_student_Info_Data.grno = this.hdr_SM_student_Info_form?.controls['GRno'].value);
    };
    (this.hdr_SM_student_Info_Data.StudentCategory = this.hdr_SM_student_Info_form?.controls['stdcategory'].value);
    (this.hdr_SM_student_Info_Data.FullName = this.hdr_SM_student_Info_form?.controls['Fullname'].value);
    (this.hdr_SM_student_Info_Data.LastName = this.hdr_SM_student_Info_form?.controls['lastname'].value);
    (this.hdr_SM_student_Info_Data.DateofBirth = this.hdr_SM_student_Info_form?.controls['dateofbirth'].value);
    (this.hdr_SM_student_Info_Data.CNIC = this.hdr_SM_student_Info_form?.controls['CNIC'].value);
    (this.hdr_SM_student_Info_Data.Nationality = this.hdr_SM_student_Info_form?.controls['Nationality'].value);
    (this.hdr_SM_student_Info_Data.gender = this.hdr_SM_student_Info_form?.controls['Gender'].value);
    (this.hdr_SM_student_Info_Data.Religon = this.hdr_SM_student_Info_form?.controls['Religion'].value);
    // Contact Info
    (this.hdr_SM_student_Info_Data.Address = this.hdr_SM_student_Info_form?.controls['Address'].value);
    (this.hdr_SM_student_Info_Data.Country = this.hdr_SM_student_Info_form?.controls['Country'].value);
    (this.hdr_SM_student_Info_Data.State = this.hdr_SM_student_Info_form?.controls['State'].value);
    (this.hdr_SM_student_Info_Data.City = this.hdr_SM_student_Info_form?.controls['City'].value);
    (this.hdr_SM_student_Info_Data.Phoneno = this.hdr_SM_student_Info_form?.controls['PhoneNo'].value);
    (this.hdr_SM_student_Info_Data.mobileno = this.hdr_SM_student_Info_form?.controls['MobileNo'].value);
    (this.hdr_SM_student_Info_Data.Email = this.hdr_SM_student_Info_form?.controls['Email'].value);
    // Academics info
    (this.hdr_SM_student_Info_Data.joingdate = this.hdr_SM_student_Info_form?.controls['JoiningDate'].value);
    (this.hdr_SM_student_Info_Data.admissiondate = this.hdr_SM_student_Info_form?.controls['AdmissionDate'].value);
    (this.hdr_SM_student_Info_Data.syllabus = this.hdr_SM_student_Info_form?.controls['Syllabus'].value);
    (this.hdr_SM_student_Info_Data.Course = this.hdr_SM_student_Info_form?.controls['Course'].value);
    (this.hdr_SM_student_Info_Data.Section = this.hdr_SM_student_Info_form?.controls['Section'].value);
    (this.hdr_SM_student_Info_Data.Sectiongroup = this.hdr_SM_student_Info_form?.controls['SectionGroup'].value);
    // father info
    (this.hdr_SM_student_Info_Data.fatherName = this.hdr_SM_student_Info_form?.controls['fathname'].value);
    (this.hdr_SM_student_Info_Data.fatherincome = this.hdr_SM_student_Info_form?.controls['FathersIncome'].value);
    (this.hdr_SM_student_Info_Data.Contactno = this.hdr_SM_student_Info_form?.controls['fathcontactno'].value);
    (this.hdr_SM_student_Info_Data.fathercnic = this.hdr_SM_student_Info_form?.controls['fathcnic'].value);
    (this.hdr_SM_student_Info_Data.whatsappno = this.hdr_SM_student_Info_form?.controls['fathcnic'].value);
    (this.hdr_SM_student_Info_Data.fatheremail = this.hdr_SM_student_Info_form?.controls['fathEmail'].value);
    (this.hdr_SM_student_Info_Data.fatheraddress = this.hdr_SM_student_Info_form?.controls['fathAddress'].value);
    (this.hdr_SM_student_Info_Data.fathercountry = this.hdr_SM_student_Info_form?.controls['fathCountry'].value);
    (this.hdr_SM_student_Info_Data.fatherstate = this.hdr_SM_student_Info_form?.controls['fathState'].value);
    (this.hdr_SM_student_Info_Data.fathercity = this.hdr_SM_student_Info_form?.controls['fathCity'].value);
    // mother info
    (this.hdr_SM_student_Info_Data.mothername = this.hdr_SM_student_Info_form?.controls['mothname'].value);
    (this.hdr_SM_student_Info_Data.mothercontactno = this.hdr_SM_student_Info_form?.controls['mothcontactno'].value);
    (this.hdr_SM_student_Info_Data.mothercnic = this.hdr_SM_student_Info_form?.controls['mothcnic'].value);
    (this.hdr_SM_student_Info_Data.motherwhatsapp = this.hdr_SM_student_Info_form?.controls['mothwhatsappno'].value);
    (this.hdr_SM_student_Info_Data.motheremail = this.hdr_SM_student_Info_form?.controls['mothEmail'].value);
    (this.hdr_SM_student_Info_Data.motheraddres = this.hdr_SM_student_Info_form?.controls['mothAddress'].value);
    (this.hdr_SM_student_Info_Data.mothercountry = this.hdr_SM_student_Info_form?.controls['mothCountry'].value);
    (this.hdr_SM_student_Info_Data.motherstate = this.hdr_SM_student_Info_form?.controls['mothState'].value);
    (this.hdr_SM_student_Info_Data.mothercity = this.hdr_SM_student_Info_form?.controls['mothCity'].value);
    // emergency info
    (this.hdr_SM_student_Info_Data.emergencyrelagion = this.hdr_SM_student_Info_form?.controls['Relation'].value);
    (this.hdr_SM_student_Info_Data.emergencypersonname = this.hdr_SM_student_Info_form?.controls['emername'].value);
    (this.hdr_SM_student_Info_Data.emergencycnic = this.hdr_SM_student_Info_form?.controls['emerCNIC'].value);
    (this.hdr_SM_student_Info_Data.emergencycontactno = this.hdr_SM_student_Info_form?.controls['emerContactNo'].value);
    (this.hdr_SM_student_Info_Data.entityId = this.entityId);
    // if(this.id === "1") {
    //   if(!this.hdr_SM_student_Info_Data.FullName || !this.hdr_SM_student_Info_Data.DateofBirth || !this.hdr_SM_student_Info_Data.Nationality || !this.hdr_SM_student_Info_Data.gender || !this.hdr_SM_student_Info_Data.Religon) {
    //     this.dcserror?.open();
    //     this.type = 4;
    //     this.messageerror = "1. [ FullName ] [ DateofBirth ] [ Nationality ] [ gender ] and [ Religon ] cannot be empty!!!"
    //   }
    // } else if(this.id === "2") {
    //   if(!this.hdr_SM_student_Info_Data.Address || !this.hdr_SM_student_Info_Data.Country || !this.hdr_SM_student_Info_Data.State || !this.hdr_SM_student_Info_Data.City || !this.hdr_SM_student_Info_Data.mobileno) {
    //     this.dcserror?.open();
    //     this.type = 4;
    //     this.messageerror = "1. [ Address ] [ Country ] [ State ] [ City ] and [ Mobile No ] cannot be empty!!!"
    //   }
    // } else if(this.id === "3") {
    //   if(!this.hdr_SM_student_Info_Data.joingdate || !this.hdr_SM_student_Info_Data.syllabus || !this.hdr_SM_student_Info_Data.Course || !this.hdr_SM_student_Info_Data.Section) {
    //     this.dcserror?.open();
    //     this.type = 4;
    //     this.messageerror = "1. [ Joing Date ] [ Syllabus ] [ Course ] and [ Section ] cannot be empty!!!"
    //   }
    // } else if(this.id === "4") {
    //   if(!this.hdr_SM_student_Info_Data.fatherName || !this.hdr_SM_student_Info_Data.Contactno || !this.hdr_SM_student_Info_Data.fathercnic) {
    //     this.dcserror?.open();
    //     this.type = 4;
    //     this.messageerror = "1. [ FatherName ] [ Contact no ] and [ fathercnic ] cannot be empty!!!";
    //   }
    // }
    if(!this.hdr_SM_student_Info_Data.FullName || !this.hdr_SM_student_Info_Data.DateofBirth || !this.hdr_SM_student_Info_Data.Nationality || !this.hdr_SM_student_Info_Data.gender || !this.hdr_SM_student_Info_Data.Religon ) {
      this.dcserror?.open();
      this.type =4;
      this.messageerror = "1. [ Personal Information ] can not be empty!!!"
    } else if(!this.hdr_SM_student_Info_Data.Address || !this.hdr_SM_student_Info_Data.Country || !this.hdr_SM_student_Info_Data.State || !this.hdr_SM_student_Info_Data.City || !this.hdr_SM_student_Info_Data.mobileno) {
      this.dcserror?.open();
      this.type =4;
      this.messageerror = "1. [ Contact Information ] can not be empty!!!"
    } else if(!this.hdr_SM_student_Info_Data.joingdate || !this.hdr_SM_student_Info_Data.syllabus || !this.hdr_SM_student_Info_Data.Course || !this.hdr_SM_student_Info_Data.Section) {
      this.dcserror?.open();
      this.type =4;
      this.messageerror = "1. [ Academic ] can not be empty!!!"
    } else if(!this.hdr_SM_student_Info_Data.fatherName || !this.hdr_SM_student_Info_Data.Contactno || !this.hdr_SM_student_Info_Data.fathercnic) {
      this.dcserror?.open();
      this.type =4;
      this.messageerror = "1. [ Father Information ] can not be empty!!!"
    } else {
        (await this.studentService.hdr_SM_student_InfoPostApi(this.hdr_SM_student_Info_Data)).subscribe((res) => {
          this.hdr_SM_student_Info_form.reset();
          this.getStudententityWise();
          this.id = "1";
          this.dcserror?.open();
          this.type = 2;
          this.messageerror = "Record Saved Successfully..";
        })
      }
  }

  async getStudententityWise() {
    this._http.get(this.url + "hdr_SM_StudentInfo/Gethdr_SM_student_InfoByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    });
  }

  initilizeGrid(){
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
        headerName: 'G.R No.',
        field: 'grno',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Student ID',
        field: 'StudentID',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'First Name',
        field: 'FullName',
        width: 220,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Father Name',
        field: 'fatherName',
        width: 220,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Gender',
        field: 'gender',
        width: 115,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      // {
      //   headerName: 'Joning Date',
      //   field: 'joingdate',
      //   width: 110,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true,
      // },
      {
        headerName: 'Syllabus',
        field: 'syllabus',
        width: 130,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
       {
        headerName: 'Course',
        field: 'Course',
        width: 130,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Section',
        field: 'Section',
        width: 130,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      {
        headerName: 'Father Contact ',
        field: 'Contactno',
        width: 140,
        filter: true,
        floatingFilter: true,
        // resizable: true,
      },
    ];
    this.stdCategridArr = [
        {
          headerName: '',
          // field: '',
          width: 10,
          // filter: true,
          // floatingFilter: true,
          resizable: true,
          cellClass: 'br'
        },
        {
          headerName: 'Code',
          field: 'Code',
          width: 100,
          filter: true,
          floatingFilter: true,
          resizable: true,
          cellClass: 'br'
        },
        {
          headerName: 'Student Category',
          field: 'studentcategory',
          width: 185,
          filter: true,
          floatingFilter: true,
          resizable: true
        },
    ]
    this.countryGridArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 95,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Country',
        field: 'Country',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Dial Code',
        field: 'DialCode',
        width: 115,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ];
    this.gender = [
      {
        Id: 1,
        Code: "001",
        name: 'Boy'
      },
      {
        Id: 2,
        Code: "002",
        name: 'Girl'
      },
    ]
    this.gendergridArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Gender',
        field: 'name',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ];
    this.sectiongridArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Section Code',
        field: 'Code',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Section',
        field: 'Section',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ]
    this.religiongridArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Religion',
        field: 'Religion',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ]
    this.stategridArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'State',
        field: 'State',
        width: 190,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Country',
        field: 'Country',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ]
    this.citygridArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'City',
        field: 'City',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'State',
        field: 'State',
        width: 140,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Country',
        field: 'Country',
        width: 140,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ];
    this.syllabusArr = [
      {
        headerName: '',
        // field: '',
        width: 10,
        // filter: true,
        // floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Syllabus',
        field: 'Syllabus',
        width: 170,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
    this.courseArr = [
      {
        headerName: '',
        // field: '',
        width: 10,
        // filter: true,
        // floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'CourseCategory',
        field: 'CourseCategory',
        width: 140,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Course',
        field: 'Course',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Syllabus',
        field: 'Syllabus',
        width: 110,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      // {
      //   headerName: 'Age From',
      //   field: 'AgeFrom',
      //   width: 100,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true,
      //   cellClass: 'br'
      // },
      // {
      //   headerName: 'Age Till',
      //   field: 'AgeTill',
      //   width: 100,
      //   filter: true,
      //   floatingFilter: true,
      //   resizable: true,
      // },
    ];
    this.sectiongroupgridArr = [
      {
        headerName: '',
        // field: '',
        width: 10,
        // filter: true,
        // floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Code',
        field: 'Code',
        width: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Section Group',
        field: 'SectionGroup',
        width: 140,
        filter: true,
        floatingFilter: true,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Description',
        field: 'Description',
        width: 180,
        filter: true,
        floatingFilter: true,
        resizable: true,
      }
    ]
  }

  editModal(ev: any) {
    this.mystudentInfoModal?.open();
    // this.hdr_SM_student_Info_form?.controls['GRno'].setValue(ev.data.grno)
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Subject} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  url: any;
  rowdata: any;
  courseSyllabusname: string = "";
  type: any;
  messageerror: any = "";
  columnDefs: any = [];
  Syllabus: any;
  hdr_Ac_SubjectDataForm: any = FormGroup;
  cources: any;
  subjectLength: any;
  courseId = 1;
  subtypes: any;
  hdr_Ac_SubjecteData: Subject = new Subject();
  shownoredordfound: any;
  entityId: any;
  courcesfortop: any;
  subtypeArr: any = [];
  syllabusArr: any = [];
  courseArr: any = [];
  languageArr: any = [];
  languageGridArr: any = [];
  subCatArr: any = [];
  subCatGridArr: any = [];
  subClassArr: any = [];
  subClassGridArr: any = [];
  segmentForm: any = FormGroup;
  currentSyllabus: any;
  @ViewChild('mysubjectModal') mysubjectModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    await this.gethdr_Ac_Courses();
    await this.gethdr_Ac_Syllabus();
    await this.gethdr_Ac_Subjects();
    await this.gethdr_Ac_SubjectType();
    this.grid();
    this.form();
    this.hdr_Ac_SubjectDataForm?.controls['Compulsory'].setValue("Yes");
    this.hdr_Ac_SubjectDataForm?.controls['subcat'].setValue("Academic");
    this.hdr_Ac_SubjectDataForm?.controls['subclass'].setValue(" Core Subject");
    this.currentSyllabus = "Cambrige";
  }

  getCoursesyllabusWise(ev:any) {
    this.currentSyllabus = ev.target.value;
  }

  onblur() {
  }
  openModal() {
    this.mysubjectModal?.open('lg');
  }

  async gethdr_Ac_Subjects() {
    this._http.get(this.url + "hdr_AC_Subject/Gethdr_AC_Subjects_ByentityId_and_courseID/" + this.entityId + "/" + this.courseId).subscribe((res) => {
      this.rowdata = res;
      this.subjectLength = this.rowdata.length;
    })
  }

  grid() {
    this.subClassArr = [
      {
        Id: 1,
        subjClassName: "Core Subject",
      },
      {
        Id: 2,
        subjClassName: "Non-Core Subject"
      },
    ]
    this.subClassGridArr = [
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
        headerName: 'Subject Class',
        field: 'subjClassName',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ]
    this.subCatArr = [
      {
        Id: 1,
        subjcatName: "Academic",
        selected: true
      },
      {
        Id: 2,
        subjcatName: "Non Academic"
      },
    ]
    this.subCatGridArr = [
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
        headerName: 'Subject Category',
        field: 'subjcatName',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ]
    this.languageGridArr = [
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
        headerName: 'Language',
        field: 'langName',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ]
    this.languageArr = [
      {
        Id: 1,
        langName: "English"
      },
      {
        Id:2,
        langName: "Urdu"
      },
      {
        Id: 3,
        langName: "Sindhi"
      },
      {
        Id: 4,
        langName: "Arabic"
      },
      {
        Id: 5,
        langName: "Pashto"
      },
      {
        Id: 6,
        langName: "Memon"
      },
      {
        Id:7,
        langName: "Balochi"
      },
      {
        Id: 8,
        langName: "Sraiki"
      },
      {
        Id: 9,
        langName: "Gilgiti"
      },
      {
        Id: 10,
        langName: "Chitrali"
      },
      {
        Id: 11,
        langName: "Hindko"
      },
      {
        Id: 12,
        langName: "Shenai"
      },
    ]
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
      {
        headerName: 'Code',
        field: 'Code',
        width: 95,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Name',
        field: 'SubjectName',
        width: 200,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Subject Type',
        field: 'SubjectType',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Subject Category',
        field: 'SubjectCategory',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Subject Class',
        field: 'SubjectClass',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      }
    ];
    this.subtypeArr = [
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
        headerName: 'Subject Type',
        field: 'SubjectType',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ]
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
        cellClass: 'br'
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
  }

  form() {
    this.hdr_Ac_SubjectDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      subtype: new FormControl('', [Validators.required]),
      Syllabus: new FormControl('', [Validators.required]),
      Course: new FormControl(''),
      Language: new FormControl(''),
      PeriodsPerWeek: new FormControl(''),
      subname: new FormControl('', [Validators.required]),
      subcat: new FormControl(''),
      subclass: new FormControl(''),
      Compulsory: new FormControl(''),
    });
  }

  async gethdr_Ac_Course(syllabusId: any) {
    this._http.get(this.url + "hdr_Ac_Course/Gethdr_Ac_CourseByentityId_and_Syllabus/" + this.entityId + "/" + syllabusId).subscribe((res) => {
      this.cources = res;
    })
  }
  

  async gethdr_Ac_Courses() {
    this._http.get(this.url + "hdr_Ac_Course/Gethdr_Ac_CourseByentityId_and_Syllabus/" + this.entityId + "/" + this.currentSyllabus).subscribe((res) => {
      this.courcesfortop = res;
      if(this.courcesfortop.length <= 0) {
        this.shownoredordfound = true;
      } else {
        this.shownoredordfound = false;
        var firstItem = this.courcesfortop[0];
        this.courseId = firstItem.Course;
        this.gethdr_Ac_Subjects();
      }
    })
  }

  async gethdr_Ac_SubjectType() {
    this._http.get(this.url + "hdr_AC_Subject_Type/Gethdr_AC_SubjectType_ByentityId/" + this.entityId).subscribe((res) => {
      this.subtypes = res;
    })
  }

  async getSyllabusWiseCourses(event: any) {
    var name = event.target.value;
    await this.gethdr_Ac_Course(name);
    this.courseSyllabusname = name;
  }

  async posthdr_Ac_Subjects() {
    (this.hdr_Ac_SubjecteData.Code = this.hdr_Ac_SubjectDataForm?.controls['Code'].value);
    (this.hdr_Ac_SubjecteData.SubjectType = this.hdr_Ac_SubjectDataForm?.controls['subtype'].value);
    (this.hdr_Ac_SubjecteData.Syllabus = this.hdr_Ac_SubjectDataForm?.controls['Syllabus'].value);
    (this.hdr_Ac_SubjecteData.Course = this.hdr_Ac_SubjectDataForm?.controls['Course'].value);
    (this.hdr_Ac_SubjecteData.Language = this.hdr_Ac_SubjectDataForm?.controls['Language'].value);
    (this.hdr_Ac_SubjecteData.PeriodsPerWeek = this.hdr_Ac_SubjectDataForm?.controls['PeriodsPerWeek'].value);
    (this.hdr_Ac_SubjecteData.SubjectName = this.hdr_Ac_SubjectDataForm?.controls['subname'].value);
    (this.hdr_Ac_SubjecteData.SubjectCategory = this.hdr_Ac_SubjectDataForm?.controls['subcat'].value);
    (this.hdr_Ac_SubjecteData.SubjectClass = this.hdr_Ac_SubjectDataForm?.controls['subclass'].value);
    (this.hdr_Ac_SubjecteData.Compulsory = this.hdr_Ac_SubjectDataForm?.controls['Compulsory'].value);
    (this.hdr_Ac_SubjecteData.entityId = this.entityId);
    if(!this.hdr_Ac_SubjecteData.Code || !this.hdr_Ac_SubjecteData.SubjectType || !this.hdr_Ac_SubjecteData.Syllabus || !this.hdr_Ac_SubjecteData.Course || !this.hdr_Ac_SubjecteData.Language || !this.hdr_Ac_SubjecteData.SubjectName || !this.hdr_Ac_SubjecteData.SubjectCategory || !this.hdr_Ac_SubjecteData.SubjectClass || !this.hdr_Ac_SubjecteData.Compulsory ) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] [ SubjectType ] [ Syllabus ] [ Course ] [ Language ]  [ SubjectName ] [ SubjectCategory ] [ SubjectClass ] and [ Compulsory ] can not be empty!!!";
    } else {
      (await this.acadManagementService.hdr_Ac_SubjectsPostApi(this.hdr_Ac_SubjecteData)).subscribe((res) => {
        this.hdr_Ac_SubjectDataForm.reset();
        this.gethdr_Ac_Subjects();
        this.hdr_Ac_SubjectDataForm?.controls['Compulsory'].setValue("Yes");
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully..."
      })
    }
  }
  
  getCourseWiseSubject(item :any) {
    this.courseId = item.Course;
    this.gethdr_Ac_Subjects();
  }

  async gethdr_Ac_Syllabus() {
    this._http.get(this.url + "hdr_Ac_syllabus/Gethdr_Ac_SyllabusByentityId/" + this.entityId).subscribe((res) => {
      this.Syllabus = res;
    })
  }


}

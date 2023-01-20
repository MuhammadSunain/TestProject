import { Component, OnInit, ViewChild } from '@angular/core';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {hdr_Ac_Course} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  rowdata: any;
  type: any;
  messageerror: any = "";
  url: any;
  columnDefs: any = [];
  hdr_Ac_CourseDataForm: any = FormGroup
  hdr_Ac_CourseData: hdr_Ac_Course = new hdr_Ac_Course();
  entityId: any;
  @ViewChild('myCourseModal') myCourseModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  Syllabus: any;
  SyllabuslookupArr: any = [];
  CourseCategorylookupArr: any = [];
  courseCategory: any = [];
  
  checkboxagevalidity = true;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.hdr_Ac_CourseDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      courseCat: new FormControl('', [Validators.required]),
      Course: new FormControl('',  [Validators.required]),
      Syllabus: new FormControl('',  [Validators.required]),
      ageValidity: new FormControl(""),
      AgeFrom: new FormControl(''),
      AgeTill: new FormControl('', )
    });
    this.courseCategory = [
      {
        Id: 1,
        CourseCategory: "Pre-Primary"
      },
      {
        Id: 2,
        CourseCategory: "Primary"
      },
      {
        Id: 3,
        CourseCategory: "Middle"
      },
      {
        Id: 4,
        CourseCategory: "Senior"
      },
      {
        Id: 5,
        CourseCategory: "Secondary"
      },
      {
        Id: 6,
        CourseCategory: "Comprehensive"
      },
      {
        Id: 7,
        CourseCategory: "Intermediate"
      },
      {
        Id: 8,
        CourseCategory: "Cambridge"
      }
    ]
    await this.gethdr_Ac_Syllabus();
    await this.gethdr_Ac_Course();
    this.CourseCategorylookupArr = [
      {
        headerName: '',
        width: 10,
        resizable: true,
        cellClass: 'br'
      },
      {
        headerName: 'Course Category',
        field: 'CourseCategory',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true,
      }
    ];
    this.SyllabuslookupArr = [
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
        headerName: 'Syllabus',
        field: 'Syllabus',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      }  
    ];
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
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Course Category',
        field: 'CourseCategory',
        width: 160,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Course',
        field: 'Course',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Syllabus',
        field: 'Syllabus',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Age From',
        field: 'AgeFrom',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Age Till',
        field: 'AgeTill',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },  
    ];
  }

  onblur() {

  }

  openModal() {
    this.myCourseModal?.open('lg');
  }

  async gethdr_Ac_Syllabus() {
    this._http.get(this.url + "hdr_Ac_syllabus/Gethdr_Ac_SyllabusByentityId/" + this.entityId).subscribe((res) => {
      this.Syllabus = res;
    })
  }

  checkValidity() {
    var inp1 =document.getElementById("inp1");
    var inp2 =document.getElementById("inp2");
    if(this.hdr_Ac_CourseDataForm) {
      if(this.hdr_Ac_CourseDataForm?.controls['ageValidity'].value) {
        inp1?.classList.remove('disible');
        inp2?.classList.remove('disible');
      } else {
        this.hdr_Ac_CourseDataForm.controls["AgeFrom"].setValue(undefined);
        this.hdr_Ac_CourseDataForm.controls["AgeTill"].setValue(undefined);
        inp1?.classList.add('disible');
        inp2?.classList.add('disible');
      }
    }
  }

  async Post_hdr_Ac_Course() {
    (this.hdr_Ac_CourseData.Code = this.hdr_Ac_CourseDataForm?.controls['Code'].value);
    (this.hdr_Ac_CourseData.CourseCategory = this.hdr_Ac_CourseDataForm?.controls['courseCat'].value);
    (this.hdr_Ac_CourseData.Course = this.hdr_Ac_CourseDataForm?.controls['Course'].value);
    (this.hdr_Ac_CourseData.Syllabus = this.hdr_Ac_CourseDataForm?.controls['Syllabus'].value);
    (this.hdr_Ac_CourseData.entityId = this.entityId);
    if(this.hdr_Ac_CourseDataForm?.controls['ageValidity'].value === true) {
      (this.hdr_Ac_CourseData.AgeFrom = this.hdr_Ac_CourseDataForm?.controls['AgeFrom'].value);
      (this.hdr_Ac_CourseData.AgeTill = this.hdr_Ac_CourseDataForm?.controls['AgeTill'].value);
      if(!this.hdr_Ac_CourseData.AgeFrom || !this.hdr_Ac_CourseData.AgeTill) {
        this.dcserror?.open();
        this.type = 4;
        this.messageerror = "1. Please Fill [ Age From ] and [ Age Till ]!!"
        return;
      } else {
        (this.hdr_Ac_CourseData.AgeFrom = this.hdr_Ac_CourseDataForm?.controls['AgeFrom'].value);
        (this.hdr_Ac_CourseData.AgeTill = this.hdr_Ac_CourseDataForm?.controls['AgeTill'].value);
      }
    } else {
      (this.hdr_Ac_CourseData.AgeFrom = null);
      (this.hdr_Ac_CourseData.AgeTill = null);
    }
    if(!this.hdr_Ac_CourseData.Code || !this.hdr_Ac_CourseData.CourseCategory || !this.hdr_Ac_CourseData.Course || !this.hdr_Ac_CourseData.Syllabus) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ]  [ CourseCategory ] [ Course ] and [ Syllabus ] cannot be empty !!"
    } else {
      (await this.acadManagementService.hdr_Ac_CoursePostApi(this.hdr_Ac_CourseData)).subscribe((res) => {
        this.hdr_Ac_CourseDataForm.reset();
        this.gethdr_Ac_Course();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully!!";
      })
    }
  }

  async gethdr_Ac_Course() {
    this._http.get(this.url + "hdr_Ac_Course/Gethdr_Ac_CourseByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

}

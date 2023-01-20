import { Component, OnInit,ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {StudentPicComponent} from './student-pic/student-pic.component';
import {CellButtosComponent} from 'src/app/components/ecm-ag-grid/cell-buttos/cell-buttos.component';
import {CellButtons} from 'src/app/components/ecm-ag-grid/cell-buttos/buttos';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {filter} from 'rxjs/operators';
import { SharedServiceService } from './shared/shared-service.service';
import { Subscription } from 'rxjs';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment'
 
@Component({
  selector: 'app-class-attendence',
  templateUrl: './class-attendence.component.html',
  styleUrls: ['./class-attendence.component.scss']
})
export class ClassAttendenceComponent implements OnInit {
  markAttendanceSubscription: Subscription;
  url: any;
  cources: any;
  type: any;
  messageerror: any = "";
  rowdata: any;
  courseId: any;
  sectionId: any;
  my_form: any = FormGroup
  columnDefs: any = [];
  entityId: any;
  sections: any;
  progressWidth: Number = 0;
  TotalStudents: Number = 0; 
  girls: any = 0 ;
  girlsLength: any;
  boy: any = 0;
  stdId: any;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient,private sharedService: SharedServiceService) {  
    this.markAttendanceSubscription = this.sharedService.getClickEvent().subscribe(()=> {
      this.presant();
    })
  }

  initilizeForm() {
    this.my_form = new FormGroup({
      course: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
      attendate: new FormControl((new Date()).toISOString().substring(0,10))
    })
  }

  clearForm() {
    // this.my_form.reset();
    var courseVal = document.getElementById("course");
    var sectionVal = document.getElementById("section");
    courseVal?.classList.remove('dis');
    sectionVal?.classList.remove('dis');
    this.rowdata = [];
    this.boy = 0;
    this.girls = 0;
    this.TotalStudents = 0;
  }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    await this.gethdr_Ac_Course();
    this.intilizeGrid();
    this.getButtons();
    this.initilizeForm();
    this.rowdata = [];
  }

  cellButtons: CellButtons[] = [
    { Id: 1, Caption: "P", colorcode: "#40916C", Function: "" },
    { Id: 2, Caption: "A", colorcode: "#D00000",  Function: "" },
    { Id: 3, Caption: "L", colorcode: "#FB8500",  Function: "" },
    { Id: 4, Caption: "LV", colorcode: "#FFEE32",  Function: "" },
    { Id: 5, Caption: "AO", colorcode: "#2B92D5",  Function: "" },
    { Id: 6, Caption: "H", colorcode: "#F59BAD",  Function: "" },
    { Id: 7, Caption: "SL", colorcode: "#954535",  Function: "" },
  ];

  presant() {
    var date = new Date().toLocaleString();
    // alert(this.stdId + " Presant on " +  date)
    this.progressWidth = 48;
  }

  async gethdr_Ac_Course() {
    this._http.get(this.url + "hdr_Ac_Course/Gethdr_Ac_CourseByentityId/" + this.entityId).subscribe(async (res) => {
      this.cources = res;
    })
  }

  async gethdr_Ac_Sections() {
    this._http.get(this.url + "hdr_Ac_Section/Gethdr_Ac_SectionByentityId/" + this.entityId).subscribe((res) => {
      this.sections = res;
    })
  }

  intilizeGrid() {
    this.columnDefs = [
        {
          headerName: 'S.No',
          valueGetter: "node.rowIndex + 1",
          width: 60,
          resizable: true,
        },
        {
          headerName: 'Picture',
          cellRendererFramework: StudentPicComponent,
          width: 77,
          resizable: true,
        },
        // {
        //   headerName: 'Roll No',
        //   field: '',
        //   width: 100,
        //   filter: true,
        //   floatingFilter: true,
        //   resizable: true,
        // },
        {
          headerName: 'G.R No.',
          field: 'grno',
          width: 93,
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
          headerName: 'Student',
          field: 'FullName',
          width: 150,
          filter: true,
          floatingFilter: true,
          resizable: true,
        },
        {
          headerName: "Father's Name",
          field: 'fatherName',
          width: 161,
          filter: true,
          floatingFilter: true,
          // resizable: true,
        },
    ]
  }

  getButtons() {
    var date = new Date().toLocaleString();
    const newColumn = {
      headerName: date,
      field: '',
      width: 220,
      cellRendererFramework: CellButtosComponent,
      buttons: this.cellButtons,
      pinned: 'right',
      lockPinned: true,
      // filter: true,
      // floatingFilter: true,
      // resizable: true,
    }
    this.columnDefs.push(newColumn);
  }

  async getCourseValueForStudents(event:any) {
    var courseId = event.target.value;
    this.courseId = courseId;
    await this.gethdr_Ac_Sections();
    // this.my_form.reset();
  }

  async getSectionValueForStudents(event:any) {
    var sectionId = event.target.value;
    this.sectionId = sectionId;
    var attendate = this.my_form.controls['attendate'].value;
    if(!attendate) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "Please Select the attendence date.";
    } else {
      this.getStudents();
    }
    // await this.getStudents();
  }

  async getStudents() {
    if(this.courseId === "" || this.courseId === undefined  && this.sectionId === "" || this.sectionId === undefined) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "Please select course and section First."
    } else {
      this._http.get(this.url + "hdr_SM_StudentInfo/Gethdr_SM_student_InfoByentityId_course_and_section/" + this.entityId + "/" + this.courseId + "/" + this.sectionId).subscribe((res:any) => {
        this.rowdata = res;
        this.TotalStudents = this.rowdata.length;
        var girls = this.rowdata.filter((d: any) => d.gender == "Girl");
        var boys = this.rowdata.filter((d: any) => d.gender == "Boy");
        var courseVal = document.getElementById("course");
        var sectionVal = document.getElementById("section");
        courseVal?.classList.add('dis');
        sectionVal?.classList.add('dis');
        this.girls = girls.length;
        this.boy = boys.length;
        if(this.rowdata.length <= 0) {
          this.dcserror?.open();
          this.type = 4;
          this.messageerror = "No Record Found!!!!";
          courseVal?.classList.remove('dis');
          sectionVal?.classList.remove('dis');
        }
      })
    }
  }
  cellbtnnClick(event: any) {
  }

  getStdId(ev: any) {
  }

}

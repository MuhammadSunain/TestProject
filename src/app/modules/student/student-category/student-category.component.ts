import {HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StdCategory} from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {StudentService} from 'src/app/@Core/Services/Student/student.service';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import { AppConstants } from 'src/app/utconstant/app.constant';

@Component({
  selector: 'app-student-category',
  templateUrl: './student-category.component.html',
  styleUrls: ['./student-category.component.scss']
})
export class StudentCategoryComponent implements OnInit {
  url: any;
  rowdata: any;
  messsageerror: any;
  type: any;
  columnDefs: any = [];
  StdCategoryForm: any = FormGroup
  StdCateData: StdCategory = new StdCategory();
  @ViewChild('myStudentCategoryModal') myStudentCategoryModal?: EcmModalComponent
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private stdservice: StudentService, private _http: HttpClient) { }
  entityId: any;
  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.StdCategoryForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      stdCategory: new FormControl('', [Validators.required]),
      Description: new FormControl('')
    })
    await this.getStdCategory();
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
        headerName: 'Student Category',
        field: 'studentcategory',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 170,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
    ];
  }

  openModal() {
    this.myStudentCategoryModal?.open('lg');
  }

  onblur() {

  }

  async PostStdCategoryData(){
    (this.StdCateData.Code = this.StdCategoryForm?.controls['Code'].value);
    (this.StdCateData.studentcategory = this.StdCategoryForm?.controls['stdCategory'].value);
    (this.StdCateData.description = this.StdCategoryForm?.controls['Description'].value);
    (this.StdCateData.entityId = this.entityId);
    if(!this.StdCateData.Code || !this.StdCateData.studentcategory) {
      this.dcserror?.open();
      this.type = 4;
      this.messsageerror = "1. [ Code ] and [ Student Category ] can not be empty!!!"
    } else {
      (await this.stdservice.StdCategoryPostApi(this.StdCateData)).subscribe((res) => {
        this.StdCategoryForm.reset();
        this.getStdCategory();
        this.dcserror?.open();
        this.type = 2;
        this.messsageerror = "Record Saved Successfully..."
      })
    }
  }

  async getStdCategory() {
    this._http.get(this.url + "student_Category/GetStdCategoryByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

}

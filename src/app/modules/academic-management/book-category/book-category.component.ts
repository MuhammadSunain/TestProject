import { Component, OnInit, ViewChild } from '@angular/core';
import {EcmModalComponent} from 'src/app/components/ecm-modal/ecm-modal.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { BookCategory } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import {HttpClient} from '@angular/common/http';
import {AcademicManagementService} from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import {CellrendererComponent} from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';


@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss']
})
export class BookCategoryComponent implements OnInit {
  url :any;
  rowdata: any;
  type: any;
  messageerror: any = "";
  columnDefs: any = [];
  hdr_Ac_BookCategoryDataForm: any = FormGroup
  hdr_Ac_BookCategoryData: BookCategory = new BookCategory();
  entityId: any;
  @ViewChild('mybookModal') mybookModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(private acadManagementService: AcademicManagementService, private _http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem("Entity");
    this.hdr_Ac_BookCategoryDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      bookcat: new FormControl('', [Validators.required]),
    });
    await this.gethdr_Ac_BookCategory();
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
        headerName: 'Book Category',
        field: 'BookCategory',
        width: 185,
        filter: true,
        floatingFilter: true,
        resizable: true
      }
    ];
  }

  onblur() {
  }
  openModal() {
    this.mybookModal?.open('lg');
  }
  async Post_hdr_Ac_BookCategoryData() {
    (this.hdr_Ac_BookCategoryData.Code = this.hdr_Ac_BookCategoryDataForm?.controls['Code'].value);
    (this.hdr_Ac_BookCategoryData.BookCategory = this.hdr_Ac_BookCategoryDataForm?.controls['bookcat'].value);
    (this.hdr_Ac_BookCategoryData.entityId = this.entityId);
    if(!this.hdr_Ac_BookCategoryData.Code || !this.hdr_Ac_BookCategoryData.BookCategory) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] and [ BookCategory ] can not be empty!!!";
    } else {
      (await this.acadManagementService.hdr_Ac_BookCategoryPostApi(this.hdr_Ac_BookCategoryData)).subscribe((res) => {
        this.hdr_Ac_BookCategoryDataForm.reset();
        this.gethdr_Ac_BookCategory();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully..."
      })
    }
  }

  async gethdr_Ac_BookCategory() {
    this._http.get(this.url + "hdr_AC_Book_Category/Gethdr_AC_BookCategory_ByentityId/" + this.entityId).subscribe((res) => {
      this.rowdata = res;
    })
  }

}

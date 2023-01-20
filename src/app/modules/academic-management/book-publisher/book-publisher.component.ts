import { Component, OnInit, ViewChild } from '@angular/core';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookPublisher } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import { HttpClient } from '@angular/common/http';
import { AcademicManagementService } from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-book-publisher',
  templateUrl: './book-publisher.component.html',
  styleUrls: ['./book-publisher.component.scss'],
})
export class BookPublisherComponent implements OnInit {
  url: any;
  rowdata: any;
  columnDefs: any = [];
  type: any;
  messageerror: any = "";
  getCountries: any;
  hdr_Ac_BookPublisherDataForm: any = FormGroup;
  hdr_Ac_BookPublisherData: BookPublisher = new BookPublisher();
  entityId: any;
  CountrylookupArr: any = [];
  @ViewChild('mybookModal') mybookModal?: EcmModalComponent;
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;
  constructor(
    private acadManagementService: AcademicManagementService,
    private _http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem('Entity');
    this.grid();
    await this.getAllCountries();
    await this.gethdr_Ac_Bookpublisher();
    this.hdr_Ac_BookPublisherDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      Publisher: new FormControl('', [Validators.required]),
      Address: new FormControl(''),
      Country: new FormControl('', [Validators.required]),
      phno: new FormControl('', [Validators.required]),
      Email: new FormControl(''),
      Weburl: new FormControl(''),
    });
    this.CountrylookupArr = [
      {
        headerName: '',
        width: 10,
        cellClass: 'br',
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
  }

  onblur() {}
  openModal() {
    this.mybookModal?.open('lg');
  }

  async Post_hdr_Ac_BookPublisherData() {
    (this.hdr_Ac_BookPublisherData.Code = this.hdr_Ac_BookPublisherDataForm?.controls['Code'].value);
    (this.hdr_Ac_BookPublisherData.Publisher = this.hdr_Ac_BookPublisherDataForm?.controls['Publisher'].value);
    (this.hdr_Ac_BookPublisherData.Address = this.hdr_Ac_BookPublisherDataForm?.controls['Address'].value);
    (this.hdr_Ac_BookPublisherData.Country = this.hdr_Ac_BookPublisherDataForm?.controls['Country'].value);
    (this.hdr_Ac_BookPublisherData.PhoneNo = this.hdr_Ac_BookPublisherDataForm?.controls['phno'].value);
    (this.hdr_Ac_BookPublisherData.Email = this.hdr_Ac_BookPublisherDataForm?.controls['Email'].value);
    (this.hdr_Ac_BookPublisherData.WebUrl = this.hdr_Ac_BookPublisherDataForm?.controls['Weburl'].value);
    (this.hdr_Ac_BookPublisherData.entityId = this.entityId);
    if(!this.hdr_Ac_BookPublisherData.Code || !this.hdr_Ac_BookPublisherData.Publisher || !this.hdr_Ac_BookPublisherData.Country || !this.hdr_Ac_BookPublisherData.PhoneNo) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] [ Publisher ] [ Country ] and [ PhoneNo ] can not be empty!!!";
    } else {
      (await this.acadManagementService.hdr_Ac_BookPublisherPostApi(this.hdr_Ac_BookPublisherData)).subscribe((res) => {
        this.hdr_Ac_BookPublisherDataForm.reset();
        this.gethdr_Ac_Bookpublisher();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully..."
      })
    }
  }

  async getAllCountries() {
    this._http.get(this.url + 'ut_Countries/Getut_Country_ByentityId/' +this.entityId).subscribe((res) => {
      this.getCountries = res;
    });
  }

  async gethdr_Ac_Bookpublisher() {
    this._http.get(this.url + 'hdr_AC_Book_Publisher/Gethdr_AC_BookPublisher_ByentityId/' + this.entityId).subscribe((res) => {
      this.rowdata = res;
    });
  }

  grid() {
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
        width: 105,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Publisher',
        field: 'Publisher',
        width: 195,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Country',
        field: 'Country',
        width: 195,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Phone No',
        field: 'PhoneNo',
        width: 125,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Email',
        field: 'Email',
        width: 185,
        filter: true,
        floatingFilter: true,
        resizable: true
      }
    ];
  }
}

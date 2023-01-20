import { Component, OnInit, ViewChild } from '@angular/core';
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookAuthor } from 'src/app/@Core/interfaces/ecm-model-interfaces';
import { HttpClient } from '@angular/common/http';
import { AcademicManagementService } from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service';
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { AppConstants } from 'src/app/utconstant/app.constant';
import {DcsMessageComponent} from 'src/app/components/dcs-message/dcs-error.component';

@Component({
  selector: 'app-book-author',
  templateUrl: './book-author.component.html',
  styleUrls: ['./book-author.component.scss']
})
export class BookAuthorComponent implements OnInit {
  url : any;
  rowdata: any;
  type: any;
  messageerror: any = "";
  AuhtorTypes:any = [];
  columnDefs: any = [];
  getCountries: any;
  hdr_Ac_BookAuthorDataForm: any = FormGroup;
  hdr_Ac_BookAuthorData: BookAuthor = new BookAuthor();
  @ViewChild('dcserror') dcserror?: DcsMessageComponent;

  entityId: any;
  CountrylookupArr: any = [];
  AuthorTypelookupArr: any = [];
  @ViewChild('mybookModal') mybookModal?: EcmModalComponent;
  constructor(
    private acadManagementService: AcademicManagementService,
    private _http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api;
    this.entityId = localStorage.getItem('Entity');
    await this.gethdr_Ac_BookAuhtor();
    await this.getAllCountries();
    this.form();
    this.grid();
    this.AuhtorTypes = [
      {Id: 1, Type: " Editor "},
      {Id: 2, Type: "  Translator  "},
      {Id: 3, Type: "  Illustrator  "},
      {Id: 4, Type: "  Other  "}
    ]
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
    this.AuthorTypelookupArr = [
      {
        headerName: '',
        width: 10,
        cellClass: 'br',
        resizable: true,
      },
      {
        headerName: 'Type',
        field: 'Type',
        width: 135,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
    ];
  }

  form() {
    this.hdr_Ac_BookAuthorDataForm = new FormGroup({
      Code: new FormControl('', [Validators.required]),
      authortype: new FormControl('', [Validators.required]),
      nickname: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      yearborn: new FormControl('', [Validators.required]),
      yeardeied: new FormControl(''),
      Awards: new FormControl(''),
    });
  }

  onblur() {}
  openModal() {
    this.mybookModal?.open('lg');
  }

  async Post_hdr_Ac_BookAuthorData() {
    (this.hdr_Ac_BookAuthorData.Code = this.hdr_Ac_BookAuthorDataForm?.controls['Code'].value);
    (this.hdr_Ac_BookAuthorData.AuthorType = this.hdr_Ac_BookAuthorDataForm?.controls['authortype'].value);
    (this.hdr_Ac_BookAuthorData.NickName = this.hdr_Ac_BookAuthorDataForm?.controls['nickname'].value);
    (this.hdr_Ac_BookAuthorData.Name = this.hdr_Ac_BookAuthorDataForm?.controls['name'].value);
    (this.hdr_Ac_BookAuthorData.Country = this.hdr_Ac_BookAuthorDataForm?.controls['Country'].value);
    (this.hdr_Ac_BookAuthorData.YearBorn = this.hdr_Ac_BookAuthorDataForm?.controls['yearborn'].value);
    (this.hdr_Ac_BookAuthorData.YearDied = this.hdr_Ac_BookAuthorDataForm?.controls['yeardeied'].value);
    (this.hdr_Ac_BookAuthorData.Awards = this.hdr_Ac_BookAuthorDataForm?.controls['Awards'].value);
    (this.hdr_Ac_BookAuthorData.entityId = this.entityId);
    if(!this.hdr_Ac_BookAuthorData.Code || !this.hdr_Ac_BookAuthorData.AuthorType || !this.hdr_Ac_BookAuthorData.Name || !this.hdr_Ac_BookAuthorData.Country || !this.hdr_Ac_BookAuthorData.YearBorn) {
      this.dcserror?.open();
      this.type = 4;
      this.messageerror = "1. [ Code ] [ AuthorType ] [ Name ] [ Country ] and [ YearBorn ] can not be empty!!!";
    } else {
      (await this.acadManagementService.hdr_Ac_BookAuthorPostApi(this.hdr_Ac_BookAuthorData)).subscribe((res) => {
        this.hdr_Ac_BookAuthorDataForm.reset();
        this.gethdr_Ac_BookAuhtor();
        this.dcserror?.open();
        this.type = 2;
        this.messageerror = "Record Saved Successfully..."
      })
    }
  }

  async getAllCountries() {
    this._http.get(this.url + 'ut_Countries/Getut_Country_ByentityId/' + this.entityId).subscribe((res) => {
      this.getCountries = res;
    });
  }

  async gethdr_Ac_BookAuhtor() {
    this._http.get(this.url + 'hdr_AC_Book_Author/Gethdr_AC_BookAuthor_ByentityId/' + this.entityId).subscribe((res) => {
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
        headerName: 'Name',
        field: 'Name',
        width: 176,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Nick Name',
        field: 'NickName',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Author Type',
        field: 'AuthorType',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Country',
        field: 'Country',
        width: 120,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Year Born',
        field: 'YearBorn',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      },
      {
        headerName: 'Year Died',
        field: 'YearDied',
        width: 150,
        filter: true,
        floatingFilter: true,
        resizable: true
      }
    ];
  }

}


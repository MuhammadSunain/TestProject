import { Component, OnInit, ViewChild } from '@angular/core'
import { EcmModalComponent } from 'src/app/components/ecm-modal/ecm-modal.component'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Book } from 'src/app/@Core/interfaces/ecm-model-interfaces'
import { HttpClient } from '@angular/common/http'
import { AcademicManagementService } from 'src/app/@Core/Services/AcademicManagemnt/academic-management.service'
import { CellrendererComponent } from 'src/app/components/ecm-ag-grid/cellrenderer/cellrenderer.component'
import { AppConstants } from 'src/app/utconstant/app.constant'
import { DcsMessageComponent } from 'src/app/components/dcs-message/dcs-error.component'
import { BookConfigs } from './book.config'

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  url: string = ''
  entityId: any = 0
  courcesfortop: any = []
  shownoredordfound: any = false
  courseId: any
  Syllabus: any = []
  columnDefs: any = []
  hdr_Ac_BookData: Book = new Book()
  rowdata: any = []
  type: any = 0
  messageerror: any = ''
  myform: any = FormGroup
  currentSyllabus: any
  courseArr: any = []
  cources: any = []
  subjects: any = []
  subtype: any = ''

  @ViewChild('mymodal') mymodal?: EcmModalComponent
  @ViewChild('dcserror') dcserror?: DcsMessageComponent
  authors: any = []
  publishers: any = []

  constructor(private _http: HttpClient) {
    this.columnDefs = BookConfigs.columnDefs
    this.courseArr = BookConfigs.courseArr
  }

  async openModal() {
    this.mymodal?.open()
    await this.gethdr_Ac_BookAuhtor()
    await this.gethdr_Ac_Bookpublisher()
  }

  async ngOnInit(): Promise<void> {
    this.url = AppConstants.urls.api
    this.entityId = localStorage.getItem('Entity')
    await this.gethdr_Ac_Courses()
    await this.gethdr_Ac_Syllabus()
    this.currentSyllabus = 'Cambrige'
    this.form()
  }

  async gethdr_Ac_Courses() {
    this._http
      .get(
        this.url +
          'hdr_Ac_Course/Gethdr_Ac_CourseByentityId_and_Syllabus/' +
          this.entityId +
          '/' +
          this.currentSyllabus,
      )
      .subscribe((res) => {
        this.courcesfortop = res
        this.cources = res
        if (this.courcesfortop.length <= 0) {
          this.shownoredordfound = true
        } else {
          this.shownoredordfound = false
          var firstItem = this.courcesfortop[0]
          this.courseId = firstItem.Course
        }
      })
  }

  async gethdr_Ac_Syllabus() {
    this._http
      .get(
        this.url +
          'hdr_Ac_syllabus/Gethdr_Ac_SyllabusByentityId/' +
          this.entityId,
      )
      .subscribe((res) => {
        this.Syllabus = res
      })
  }

  async getSubjectsCourseWise(ev: any) {
    var course = ev.target.value
    this._http
      .get(
        this.url +
          'hdr_AC_Subject/Gethdr_AC_Subjects_ByentityId_and_courseID/' +
          this.entityId +
          '/' +
          course,
      )
      .subscribe((res: any) => {
        this.subjects = res
      })
  }

  form() {
    this.myform = new FormGroup({
      bookno: new FormControl(''),
      subtype: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      bookname: new FormControl('', [Validators.required]),
      tag: new FormControl(''),
      author: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      barcode: new FormControl(''),
      price: new FormControl(''),
      edition: new FormControl(''),
      year: new FormControl(''),
      seriesname: new FormControl(''),
    })
  }

  getsubjectchange() {
    if (this.myform.controls['subject'].value != undefined) {
      let subejct = this.myform.controls['subject'].value
      if (subejct) {
        let objSubect = this.subjects.filter(
          (o: any) => o.SubjectName === subejct,
        )[0]
        if (objSubect)
          this.myform.controls['subtype'].setValue(objSubect.SubjectType)
        this.subtype = objSubect.SubjectType
      }
    }
  }

  async gethdr_Ac_BookAuhtor() {
    this._http
      .get(
        this.url +
          'hdr_AC_Book_Author/Gethdr_AC_BookAuthor_ByentityId/' +
          this.entityId,
      )
      .subscribe((res) => {
        this.authors = res
      })
  }

  async gethdr_Ac_Bookpublisher() {
    this._http
      .get(
        this.url +
          'hdr_AC_Book_Publisher/Gethdr_AC_BookPublisher_ByentityId/' +
          this.entityId,
      )
      .subscribe((res) => {
        this.publishers = res
      })
  }

  async save() {
    var randomnum = String(Math.floor(Math.random() * 10000))
    var currentYear = new Date().getFullYear()
    // var currentMonth = new Date().getUTCMonth();
    var booknum = currentYear + randomnum
    this.hdr_Ac_BookData.bookno = booknum
    this.hdr_Ac_BookData.course = this.myform?.controls['course'].value
    this.hdr_Ac_BookData.Subject = this.myform?.controls['subject'].value
    this.hdr_Ac_BookData.subtype = this.myform?.controls['subtype'].value
    this.hdr_Ac_BookData.bookname = this.myform?.controls['bookname'].value
    this.hdr_Ac_BookData.tag = this.myform?.controls['tag'].value
    this.hdr_Ac_BookData.author = this.myform?.controls['author'].value
    this.hdr_Ac_BookData.publisher = this.myform?.controls['publisher'].value
    this.hdr_Ac_BookData.barcode = this.myform?.controls['barcode'].value
    this.hdr_Ac_BookData.edition = this.myform?.controls['edition'].value
    this.hdr_Ac_BookData.year = this.myform?.controls['year'].value
    this.hdr_Ac_BookData.seriesname = this.myform?.controls['seriesname'].value
    this.hdr_Ac_BookData.entityId = this.entityId
    this.hdr_Ac_BookData.clientId = AppConstants.settings.clientid

    if (this.hdr_Ac_BookData != undefined && this.hdr_Ac_BookData != null) {
      if (
        !this.hdr_Ac_BookData.course ||
        !this.hdr_Ac_BookData.Subject ||
        !this.hdr_Ac_BookData.subtype ||
        !this.hdr_Ac_BookData.bookname
      ) {
        this.dcserror?.open()
        this.type = 4
        this.messageerror =
          '1. [ Course ] [ Subject ] [ Subject Type ] and [ Book Name ] cannot be empty!!!'
      } else {
        if (!this.hdr_Ac_BookData.author || !this.hdr_Ac_BookData.publisher) {
          this.dcserror?.open()
          this.type = 4
          this.messageerror =
            '1. [ Author ] and [ Publisher ] cannot be empty!!!'
        } else {
          this.dcserror?.open()
          this.type = 2
          this.messageerror = 'Record Saved successfully...'
        }
      }
    }
  }
}

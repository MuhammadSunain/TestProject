import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../../utconstant/app.constant'

@Injectable({
  providedIn: 'root'
})
export class AcademicManagementService {

  constructor(private _http: HttpClient) { }

  async hdr_Ac_SyllabusPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_Ac_syllabus/Save/hdr_Ac_syllabus", data).pipe(map((res:any) => {
      return res;
    }))
  };

  async hdr_Ac_CoursePostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_Ac_Course/Save/hdr_Ac_course", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_SectionPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_Ac_Section/Save/hdr_Ac_section", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_SectionGroupPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_Ac_Section_group/Save/hdr_Ac_section_group", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_SubjectTypePostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_AC_Subject_Type/Save/hdr_AC_SubjectType", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_BookTypePostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_AC_Book_Type/Save/hdr_Ac_BookType", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_BookCategoryPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_AC_Book_Category/Save/hdr_Ac_BookCategory", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_BookPublisherPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_AC_Book_Publisher/Save/hdr_Ac_BookPublisher", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_BookAuthorPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_AC_Book_Author/Save/hdr_Ac_BookAuthor", data).pipe(map((res:any) => {
      return res;
    }))
  }

  async hdr_Ac_SubjectsPostApi(data: any) {
    var url = AppConstants.urls.api;
    return this._http.post<any>(url + "hdr_AC_Subject/Save/hdr_Ac_subject", data).pipe(map((res:any) => {
      return res;
    }))
  }

}

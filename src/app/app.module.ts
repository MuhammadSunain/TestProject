import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngb-modal';
import { NgxGaugeModule } from 'ngx-gauge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcmTextboxComponent } from './components/ecm-textbox/ecm-textbox.component';
import { DcsTextareaComponent } from './components/ecm-textarea/ecm-textarea.component';
import { EcmBtnGroupComponent } from './components/ecm-btn-group/ecm-btn-group.component';
import { EcmDropdowmComponent } from './components/ecm-dropdowm/ecm-dropdowm.component';
import { EcmTopScreenHeaderComponent } from './components/ecm-top-screen-header/ecm-top-screen-header.component';
import { EcmModalComponent } from './components/ecm-modal/ecm-modal.component';
import { EcmAgGridComponent } from './components/ecm-ag-grid/ecm-ag-grid.component';
import {AgGridModule} from 'ag-grid-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { NotfoundComponent } from './authentication/notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import {AttendashboardComponent} from './dashboard/dashboard/attendashboard/attendashboard.component';
import { ModulesComponent } from './modules/modules.component';
import { EntitySetupComponent } from './modules/entity-setup/entity-setup.component';
import { StudentComponent } from './modules/student/student.component';
import { EntityComponent } from './modules/entity-setup/entity/entity.component';
import { EntityTypeComponent } from './modules/entity-setup/entity-type/entity-type.component';
import { CellrendererComponent } from './components/ecm-ag-grid/cellrenderer/cellrenderer.component';
import { StudentCategoryComponent } from './modules/student/student-category/student-category.component';
import { UserManagrmentComponent } from './modules/user-managrment/user-managrment.component';
import { UserRoleComponent } from './modules/user-managrment/user-role/user-role.component';
import { UserAuthrizationComponent } from './modules/user-managrment/user-authrization/user-authrization.component';
import { SystemSettingsComponent } from './modules/system-settings/system-settings.component';
import { SystemPoliciesComponent } from './modules/system-settings/system-policies/system-policies.component';
import { EcmLookupComponent } from './components/ecm-lookup/ecm-lookup.component';
import { AcademicManagementComponent } from './modules/academic-management/academic-management.component';
import { GridBarsIconComponent } from './components/ecm-ag-grid/grid-bars-icon/grid-bars-icon.component';
import {EcmLoderComponent} from './components/app-loder/app-loder.component';
import { SyllabusComponent } from './modules/academic-management/syllabus/syllabus.component';
import { CourseComponent } from './modules/academic-management/course/course.component';
import { SectionComponent } from './modules/academic-management/section/section.component';
import { SectionGroupComponent } from './modules/academic-management/section-group/section-group.component';
import { StudentInformationComponent } from './modules/student/student-information/student-information.component';
import { CasteComponent } from './modules/student/caste/caste.component';
import { SubjectTypeComponent } from './modules/academic-management/subject-type/subject-type.component';
import { BookTypeComponent } from './modules/academic-management/book-type/book-type.component';
import { BookCategoryComponent } from './modules/academic-management/book-category/book-category.component';
import { BookPublisherComponent } from './modules/academic-management/book-publisher/book-publisher.component';
import { BookAuthorComponent } from './modules/academic-management/book-author/book-author.component';
import { SubjectsComponent } from './modules/academic-management/subjects/subjects.component';
import { ClassAttendenceComponent } from './modules/student/class-attendence/class-attendence.component';
import { StudentPicComponent } from './modules/student/class-attendence/student-pic/student-pic.component';
import { CellButtosComponent } from './components/ecm-ag-grid/cell-buttos/cell-buttos.component';
import { DcsMessageComponent } from './components/dcs-message/dcs-error.component';
import { CustomGridComponent } from './components/custom-grid/custom-grid.component';
import { DcsDeleteComponent } from './components/dcs-delete/dcs-delete.component';
import { SmsQualificationTypeComponent } from './modules/student/sms-qualification-type/sms-qualification-type.component';
import { SmsQualificationComponent } from './modules/student/sms-qualification/sms-qualification.component';
import { SmsReligionComponent } from './modules/student/sms-religion/sms-religion.component';
import { CountryComponent } from './modules/entity-setup/country/country.component';
import { StateComponent } from './modules/entity-setup/state/state.component';
import { CityComponent } from './modules/entity-setup/city/city.component';
import { HumanResourceComponent } from './modules/human-resource/human-resource.component';
import { FrontDeskComponent } from './modules/front-desk/front-desk.component';
import { EmployeeProfileComponent } from './modules/human-resource/employee-profile/employee-profile.component';
import { DcsTextboxComponent } from './components/dcs-textbox/dcs-textbox.component';
import { EmployeeProfile2Component } from './modules/human-resource/employee-profile2/employee-profile2.component';
import { CaseGroupComponent } from './modules/front-desk/setup/case-group/case-group.component';
import { CaseTypeComponent } from './modules/front-desk/setup/case-type/case-type.component';
import { SourceComponent } from './modules/front-desk/setup/source/source.component';
import { PurposeComponent } from './modules/front-desk/setup/purpose/purpose.component';
import { CertificateTypeComponent } from './modules/front-desk/setup/certificate-type/certificate-type.component';
import { CaseRulesComponent } from './modules/front-desk/setup/case-rules/case-rules.component';
import { CertificateStageComponent } from './modules/front-desk/setup/certificate-stage/certificate-stage.component';
import { ComplainsDashboardComponent } from './dashboard/dashboard/complains-dashboard/complains-dashboard.component';
import { ASideComponent } from './components/a-side/a-side.component';
import { CaseRegisterComponent } from './modules/front-desk/Desk/case-register/case-register.component';
import { BookComponent } from './modules/academic-management/book/book.component';
// import { DcsDropdownComponent } from './components/dcs-dropdown/dcs-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    EcmTextboxComponent,
    DcsTextareaComponent,
    EcmBtnGroupComponent,
    EcmDropdowmComponent,
    EcmTopScreenHeaderComponent,
    EcmModalComponent,
    EcmAgGridComponent,
    LoginComponent,
    NotfoundComponent,
    DashboardComponent,
    AttendashboardComponent,
    ModulesComponent,
    EntitySetupComponent,
    StudentComponent,
    EntityComponent,
    EntityTypeComponent,
    CellrendererComponent,
    StudentCategoryComponent,
    UserManagrmentComponent,
    UserRoleComponent,
    UserAuthrizationComponent,
    SystemSettingsComponent,
    SystemPoliciesComponent,
    EcmLookupComponent,
    AcademicManagementComponent,
    GridBarsIconComponent,
    EcmLoderComponent,
    SyllabusComponent,
    CourseComponent,
    SectionComponent,
    SectionGroupComponent,
    StudentInformationComponent,
    CasteComponent,
    SubjectTypeComponent,
    BookTypeComponent,
    BookCategoryComponent,
    BookPublisherComponent,
    BookAuthorComponent,
    SubjectsComponent,
    ClassAttendenceComponent,
    StudentPicComponent,
    CellButtosComponent,
    DcsMessageComponent,
    CustomGridComponent,
    DcsDeleteComponent,
    SmsQualificationTypeComponent,
    SmsQualificationComponent,
    SmsReligionComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    HumanResourceComponent,
    FrontDeskComponent,
    EmployeeProfileComponent,
    DcsTextboxComponent,
    EmployeeProfile2Component,
    CaseGroupComponent,
    CaseTypeComponent,
    SourceComponent,
    PurposeComponent,
    CertificateTypeComponent,
    CaseRulesComponent,
    CertificateStageComponent,
    ComplainsDashboardComponent,
    ASideComponent,
    CaseRegisterComponent,
    BookComponent,
    // DcsDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    AgGridModule,
    FormsModule,
    HttpClientModule,
    NgxGaugeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {AttendashboardComponent} from './dashboard/dashboard/attendashboard/attendashboard.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {EntitySetupComponent} from './modules/entity-setup/entity-setup.component';
import {EntityTypeComponent} from './modules/entity-setup/entity-type/entity-type.component';
import {EntityComponent} from './modules/entity-setup/entity/entity.component';
import {ModulesComponent} from './modules/modules.component';
import {StudentCategoryComponent} from './modules/student/student-category/student-category.component';
import {StudentInformationComponent} from './modules/student/student-information/student-information.component';
import {StudentComponent} from './modules/student/student.component';
import {FrontDeskComponent} from './modules/front-desk/front-desk.component';
import {HumanResourceComponent} from './modules/human-resource/human-resource.component';
import {EmployeeProfileComponent} from './modules/human-resource/employee-profile/employee-profile.component';
import {SystemPoliciesComponent} from './modules/system-settings/system-policies/system-policies.component';
import {SystemSettingsComponent} from './modules/system-settings/system-settings.component';
import {UserAuthrizationComponent} from './modules/user-managrment/user-authrization/user-authrization.component';
import {UserManagrmentComponent} from './modules/user-managrment/user-managrment.component';
import {AcademicManagementComponent} from './modules/academic-management/academic-management.component';
import {UserRoleComponent} from './modules/user-managrment/user-role/user-role.component';
import {SyllabusComponent} from './modules/academic-management/syllabus/syllabus.component';
import {CourseComponent} from './modules/academic-management/course/course.component';
import {SectionComponent} from './modules/academic-management/section/section.component';
import {SectionGroupComponent} from './modules/academic-management/section-group/section-group.component';
import {CasteComponent} from './modules/student/caste/caste.component';
import {SubjectTypeComponent} from './modules/academic-management/subject-type/subject-type.component';
import {BookTypeComponent} from './modules/academic-management/book-type/book-type.component';
import {BookCategoryComponent} from './modules/academic-management/book-category/book-category.component';
import {BookPublisherComponent} from './modules/academic-management/book-publisher/book-publisher.component';
import {BookAuthorComponent} from './modules/academic-management/book-author/book-author.component';
import {SubjectsComponent} from './modules/academic-management/subjects/subjects.component';
import {ClassAttendenceComponent} from './modules/student/class-attendence/class-attendence.component';
import {SmsQualificationTypeComponent} from './modules/student/sms-qualification-type/sms-qualification-type.component';
import {SmsQualificationComponent} from './modules/student/sms-qualification/sms-qualification.component';
import {SmsReligionComponent} from './modules/student/sms-religion/sms-religion.component';
import {CountryComponent} from './modules/entity-setup/country/country.component';
import {StateComponent} from './modules/entity-setup/state/state.component';
import {CityComponent} from './modules/entity-setup/city/city.component';
import {EmployeeProfile2Component} from './modules/human-resource/employee-profile2/employee-profile2.component';
import { CaseGroupComponent } from './modules/front-desk/setup/case-group/case-group.component';
import { CaseTypeComponent } from './modules/front-desk/setup/case-type/case-type.component';
import { SourceComponent } from './modules/front-desk/setup/source/source.component';
import { PurposeComponent } from './modules/front-desk/setup/purpose/purpose.component';
import { CertificateTypeComponent } from './modules/front-desk/setup/certificate-type/certificate-type.component';
import { CaseRulesComponent } from './modules/front-desk/setup/case-rules/case-rules.component';
import { CertificateStageComponent } from './modules/front-desk/setup/certificate-stage/certificate-stage.component';
import { ComplainsDashboardComponent } from './dashboard/dashboard/complains-dashboard/complains-dashboard.component';
import { CaseRegisterComponent } from './modules/front-desk/Desk/case-register/case-register.component';
import { BookComponent } from './modules/academic-management/book/book.component';

const routes: Routes = [
  {path: "authentication/login", component: LoginComponent},
  {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
  {
    path: 'Dashboard', 
    component: DashboardComponent,
    children: [
      {
        path: 'AttendenceDashboard', 
        component: AttendashboardComponent
      },
      {
        path: 'hdr_SMComplaint', 
        component: ComplainsDashboardComponent
      },
    ]
  },
  {
    path: "Modules",
    component: ModulesComponent,
    children: [
      {
        path: 'SystemSetting', 
        component: SystemSettingsComponent,
      },
      // {
      //   path: 'SystemSetting/SystemPolicies', 
      //   // component: SystemPoliciesComponent,
      // },
      {
        path: 'EntitySetup', 
        component: EntitySetupComponent,
      },
      {
        path: 'EntitySetup/Entity',
        component: EntityComponent
      },
      {
        path: 'EntitySetup/Entity_Type',
        component: EntityTypeComponent
      },
      {
        path: 'EntitySetup/Country',
        component: CountryComponent
      },
      {
        path: 'EntitySetup/State',
        component: StateComponent
      },
      {
        path: 'EntitySetup/City',
        component: CityComponent
      },
      {
        path: 'FrontDesk',
        component: FrontDeskComponent
      },
      {
        path: 'FrontDesk/CaseGroup',
        component: CaseGroupComponent,
      },
      {
        path: 'FrontDesk/CaseType',
        component: CaseTypeComponent,
      },
      {
        path: 'FrontDesk/Source',
        component: SourceComponent,
      },
      {
        path: 'FrontDesk/Purpose',
        component: PurposeComponent,
      },
      {
        path: 'FrontDesk/CertificateType',
        component: CertificateTypeComponent,
      },
      {
        path: 'FrontDesk/CaseRules',
        component: CaseRulesComponent,
      },
      {
        path: 'FrontDesk/CertificateStage',
        component: CertificateStageComponent,
      },
      {
        path: 'FrontDesk/CaseRegister',
        component: CaseRegisterComponent,
      },
      {
        path: 'AcademicManagement',
        component: AcademicManagementComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_Syllabus',
        component: SyllabusComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_Courses',
        component: CourseComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_Section',
        component: SectionComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_Section_Group',
        component: SectionGroupComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_SubjectType',
        component: SubjectTypeComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_Subject',
        component: SubjectsComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookType',
        component: BookTypeComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookCategory',
        component: BookCategoryComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookPublisher',
        component: BookPublisherComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookAuthor',
        component: BookAuthorComponent
      },
      {
        path: 'AcademicManagement/hdr_Ac_Book',
        component: BookComponent
      },
      {
        path: 'StudentManagement', 
        component: StudentComponent,
      },
      {
        path: 'HumanResource', 
        component: HumanResourceComponent,
      },
      {
        path: 'HumanResource/EmployeeProfiling/Profiling', 
        component: EmployeeProfile2Component,
      },
      {
        path: 'StudentManagement/Student_Category', 
        component: StudentCategoryComponent,
      },
      {
        path: 'StudentManagement/hdr_SM_Caste', 
        component: CasteComponent,
      },
      {
        path: 'StudentManagement/SMS_QualificationType', 
        component: SmsQualificationTypeComponent,
      },
      {
        path: 'StudentManagement/SMS_Qualification', 
        component: SmsQualificationComponent,
      },
      {
        path: 'StudentManagement/SMS_Religion', 
        component: SmsReligionComponent,
      },
      {
        path: 'StudentManagement/hdr_SM_student_Info', 
        component: StudentInformationComponent,
      },
      {
        path: 'StudentManagement/SMStuAttendance', 
        component: ClassAttendenceComponent,
      },
      {
        path: 'UserManagement', 
        component: UserManagrmentComponent,
      },
      {
        path: 'UserManagement/Role', 
        component: UserRoleComponent,
      },
      {
        path: 'UserManagement/UserAuthrization', 
        component: UserAuthrizationComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

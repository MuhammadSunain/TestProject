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
import { AuthGuard } from './@Core/shared/auth.guard';

const routes: Routes = [
  {path: "authentication/login", component: LoginComponent},
  {path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
  {
    path: 'Dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'AttendenceDashboard', 
        component: AttendashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'hdr_SMComplaint', 
        component: ComplainsDashboardComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: "Modules",
    component: ModulesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'SystemSetting', 
        component: SystemSettingsComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'SystemSetting/SystemPolicies', 
      //   // component: SystemPoliciesComponent,
      // },
      {
        path: 'EntitySetup', 
        component: EntitySetupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'EntitySetup/Entity',
        component: EntityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'EntitySetup/Entity_Type',
        component: EntityTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'EntitySetup/Country',
        component: CountryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'EntitySetup/State',
        component: StateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'EntitySetup/City',
        component: CityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk',
        component: FrontDeskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/CaseGroup',
        component: CaseGroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/CaseType',
        component: CaseTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/Source',
        component: SourceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/Purpose',
        component: PurposeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/CertificateType',
        component: CertificateTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/CaseRules',
        component: CaseRulesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/CertificateStage',
        component: CertificateStageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'FrontDesk/CaseRegister',
        component: CaseRegisterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement',
        component: AcademicManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_Syllabus',
        component: SyllabusComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_Courses',
        component: CourseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_Section',
        component: SectionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_Section_Group',
        component: SectionGroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_SubjectType',
        component: SubjectTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_Subject',
        component: SubjectsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookType',
        component: BookTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookCategory',
        component: BookCategoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookPublisher',
        component: BookPublisherComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_BookAuthor',
        component: BookAuthorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'AcademicManagement/hdr_Ac_Book',
        component: BookComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement', 
        component: StudentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'HumanResource', 
        component: HumanResourceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'HumanResource/EmployeeProfiling/Profiling', 
        component: EmployeeProfile2Component,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement/Student_Category', 
        component: StudentCategoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement/hdr_SM_Caste', 
        component: CasteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement/SMS_QualificationType', 
        component: SmsQualificationTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement/SMS_Qualification', 
        component: SmsQualificationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement/SMS_Religion', 
        component: SmsReligionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement/hdr_SM_student_Info', 
        component: StudentInformationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'StudentManagement/SMStuAttendance', 
        component: ClassAttendenceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'UserManagement', 
        component: UserManagrmentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'UserManagement/Role', 
        component: UserRoleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'UserManagement/UserAuthrization', 
        component: UserAuthrizationComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

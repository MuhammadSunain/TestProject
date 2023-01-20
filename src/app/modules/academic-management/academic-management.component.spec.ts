import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicManagementComponent } from './academic-management.component';

describe('AcademicManagementComponent', () => {
  let component: AcademicManagementComponent;
  let fixture: ComponentFixture<AcademicManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

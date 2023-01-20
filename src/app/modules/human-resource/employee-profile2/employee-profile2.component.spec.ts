import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfile2Component } from './employee-profile2.component';

describe('EmployeeProfile2Component', () => {
  let component: EmployeeProfile2Component;
  let fixture: ComponentFixture<EmployeeProfile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfile2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProfile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

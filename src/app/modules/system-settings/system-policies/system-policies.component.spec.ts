import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPoliciesComponent } from './system-policies.component';

describe('SystemPoliciesComponent', () => {
  let component: SystemPoliciesComponent;
  let fixture: ComponentFixture<SystemPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemPoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

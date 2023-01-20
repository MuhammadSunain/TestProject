import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRegisterComponent } from './case-register.component';

describe('CaseRegisterComponent', () => {
  let component: CaseRegisterComponent;
  let fixture: ComponentFixture<CaseRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

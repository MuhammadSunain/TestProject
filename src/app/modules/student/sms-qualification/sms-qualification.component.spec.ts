import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsQualificationComponent } from './sms-qualification.component';

describe('SmsQualificationComponent', () => {
  let component: SmsQualificationComponent;
  let fixture: ComponentFixture<SmsQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsQualificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

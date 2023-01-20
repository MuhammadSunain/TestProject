import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsQualificationTypeComponent } from './sms-qualification-type.component';

describe('SmsQualificationTypeComponent', () => {
  let component: SmsQualificationTypeComponent;
  let fixture: ComponentFixture<SmsQualificationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsQualificationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsQualificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

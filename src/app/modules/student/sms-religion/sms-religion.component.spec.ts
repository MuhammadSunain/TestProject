import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsReligionComponent } from './sms-religion.component';

describe('SmsReligionComponent', () => {
  let component: SmsReligionComponent;
  let fixture: ComponentFixture<SmsReligionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsReligionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

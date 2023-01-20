import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcmBtnGroupComponent } from './ecm-btn-group.component';

describe('EcmBtnGroupComponent', () => {
  let component: EcmBtnGroupComponent;
  let fixture: ComponentFixture<EcmBtnGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcmBtnGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcmBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

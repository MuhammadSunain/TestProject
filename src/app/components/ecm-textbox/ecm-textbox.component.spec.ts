import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcmTextboxComponent } from './ecm-textbox.component';

describe('EcmTextboxComponent', () => {
  let component: EcmTextboxComponent;
  let fixture: ComponentFixture<EcmTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcmTextboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcmTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

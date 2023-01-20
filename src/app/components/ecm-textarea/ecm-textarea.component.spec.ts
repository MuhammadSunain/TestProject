import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcmTextareaComponent } from './ecm-textarea.component';

describe('EcmTextareaComponent', () => {
  let component: EcmTextareaComponent;
  let fixture: ComponentFixture<EcmTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcmTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcmTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

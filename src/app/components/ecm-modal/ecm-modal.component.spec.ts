import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcmModalComponent } from './ecm-modal.component';

describe('EcmModalComponent', () => {
  let component: EcmModalComponent;
  let fixture: ComponentFixture<EcmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcmModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

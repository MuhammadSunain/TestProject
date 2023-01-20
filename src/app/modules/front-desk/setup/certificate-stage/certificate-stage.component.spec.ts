import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateStageComponent } from './certificate-stage.component';

describe('CertificateStageComponent', () => {
  let component: CertificateStageComponent;
  let fixture: ComponentFixture<CertificateStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

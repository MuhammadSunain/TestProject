import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcmDropdowmComponent } from './ecm-dropdowm.component';

describe('EcmDropdowmComponent', () => {
  let component: EcmDropdowmComponent;
  let fixture: ComponentFixture<EcmDropdowmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcmDropdowmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcmDropdowmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

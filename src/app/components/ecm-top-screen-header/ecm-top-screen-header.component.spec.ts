import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcmTopScreenHeaderComponent } from './ecm-top-screen-header.component';

describe('EcmTopScreenHeaderComponent', () => {
  let component: EcmTopScreenHeaderComponent;
  let fixture: ComponentFixture<EcmTopScreenHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcmTopScreenHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcmTopScreenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

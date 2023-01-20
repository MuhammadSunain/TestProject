import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcmAgGridComponent } from './ecm-ag-grid.component';

describe('EcmAgGridComponent', () => {
  let component: EcmAgGridComponent;
  let fixture: ComponentFixture<EcmAgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcmAgGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcmAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

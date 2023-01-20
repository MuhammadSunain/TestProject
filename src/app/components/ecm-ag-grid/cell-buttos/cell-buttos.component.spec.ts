import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellButtosComponent } from './cell-buttos.component';

describe('CellButtosComponent', () => {
  let component: CellButtosComponent;
  let fixture: ComponentFixture<CellButtosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellButtosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellButtosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

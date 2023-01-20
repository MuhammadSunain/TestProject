import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellrendererComponent } from './cellrenderer.component';

describe('CellrendererComponent', () => {
  let component: CellrendererComponent;
  let fixture: ComponentFixture<CellrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellrendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

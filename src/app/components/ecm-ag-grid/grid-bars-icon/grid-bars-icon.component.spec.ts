import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBarsIconComponent } from './grid-bars-icon.component';

describe('GridBarsIconComponent', () => {
  let component: GridBarsIconComponent;
  let fixture: ComponentFixture<GridBarsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridBarsIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridBarsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

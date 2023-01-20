import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcsDropdownComponent } from './dcs-dropdown.component';

describe('DcsDropdownComponent', () => {
  let component: DcsDropdownComponent;
  let fixture: ComponentFixture<DcsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcsDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

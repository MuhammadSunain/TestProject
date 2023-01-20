import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcsTextboxComponent } from './dcs-textbox.component';

describe('DcsTextboxComponent', () => {
  let component: DcsTextboxComponent;
  let fixture: ComponentFixture<DcsTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcsTextboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcsTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

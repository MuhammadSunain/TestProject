import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseGroupComponent } from './case-group.component';

describe('CaseGroupComponent', () => {
  let component: CaseGroupComponent;
  let fixture: ComponentFixture<CaseGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRulesComponent } from './case-rules.component';

describe('CaseRulesComponent', () => {
  let component: CaseRulesComponent;
  let fixture: ComponentFixture<CaseRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

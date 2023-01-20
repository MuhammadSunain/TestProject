import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySetupComponent } from './entity-setup.component';

describe('EntitySetupComponent', () => {
  let component: EntitySetupComponent;
  let fixture: ComponentFixture<EntitySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitySetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthrizationComponent } from './user-authrization.component';

describe('UserAuthrizationComponent', () => {
  let component: UserAuthrizationComponent;
  let fixture: ComponentFixture<UserAuthrizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthrizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthrizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

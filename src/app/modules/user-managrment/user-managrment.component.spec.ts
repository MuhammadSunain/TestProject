import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagrmentComponent } from './user-managrment.component';

describe('UserManagrmentComponent', () => {
  let component: UserManagrmentComponent;
  let fixture: ComponentFixture<UserManagrmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagrmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagrmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttendenceComponent } from './class-attendence.component';

describe('ClassAttendenceComponent', () => {
  let component: ClassAttendenceComponent;
  let fixture: ComponentFixture<ClassAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAttendenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

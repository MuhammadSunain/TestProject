import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPicComponent } from './student-pic.component';

describe('StudentPicComponent', () => {
  let component: StudentPicComponent;
  let fixture: ComponentFixture<StudentPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

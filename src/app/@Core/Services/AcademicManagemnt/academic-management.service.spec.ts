import { TestBed } from '@angular/core/testing';

import { AcademicManagementService } from './academic-management.service';

describe('AcademicManagementService', () => {
  let service: AcademicManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

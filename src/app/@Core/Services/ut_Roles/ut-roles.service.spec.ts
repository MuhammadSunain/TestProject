import { TestBed } from '@angular/core/testing';

import { UtRolesService } from './ut-roles.service';

describe('UtRolesService', () => {
  let service: UtRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

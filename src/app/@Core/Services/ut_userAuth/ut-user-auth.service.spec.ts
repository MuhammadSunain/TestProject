import { TestBed } from '@angular/core/testing';

import { UtUserAuthService } from './ut-user-auth.service';

describe('UtUserAuthService', () => {
  let service: UtUserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtUserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

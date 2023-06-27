import { TestBed } from '@angular/core/testing';

import { PayguardGuard } from './payguard.guard';

describe('PayguardGuard', () => {
  let guard: PayguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PayguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

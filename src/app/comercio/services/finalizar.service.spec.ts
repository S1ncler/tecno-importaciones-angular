import { TestBed } from '@angular/core/testing';

import { FinalizarService } from './finalizar.service';

describe('FinalizarService', () => {
  let service: FinalizarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalizarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

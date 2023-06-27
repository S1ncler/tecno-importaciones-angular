import { TestBed } from '@angular/core/testing';

import { ProductHomeService } from './product-home.service';

describe('ProductHomeService', () => {
  let service: ProductHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

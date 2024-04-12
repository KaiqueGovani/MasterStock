import { TestBed } from '@angular/core/testing';

import { EscanearService } from './escanear.service';

describe('EscanearService', () => {
  let service: EscanearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscanearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

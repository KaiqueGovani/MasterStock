import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { confirmandoGuard } from './confirmando.guard';

describe('confirmandoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => confirmandoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

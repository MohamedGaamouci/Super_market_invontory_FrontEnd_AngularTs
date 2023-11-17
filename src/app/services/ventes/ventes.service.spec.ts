import { TestBed } from '@angular/core/testing';

import { Ventesservice } from './ventes.service';

describe('VentesService', () => {
  let service: Ventesservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ventesservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

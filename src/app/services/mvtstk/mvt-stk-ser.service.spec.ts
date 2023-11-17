import { TestBed } from '@angular/core/testing';

import { MvtStkSerService } from './mvt-stk-ser.service';

describe('MvtStkSerService', () => {
  let service: MvtStkSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MvtStkSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HealthConnectService } from './health-connect.service';

describe('HealthConnectService', () => {
  let service: HealthConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

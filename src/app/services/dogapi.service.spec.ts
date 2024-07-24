import { TestBed } from '@angular/core/testing';

import { DogapiService } from './dogapi.service';

describe('DogapiService', () => {
  let service: DogapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

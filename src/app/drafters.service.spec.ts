import { TestBed, inject } from '@angular/core/testing';

import { DraftersService } from './drafters.service';

describe('DraftersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DraftersService]
    });
  });

  it('should ...', inject([DraftersService], (service: DraftersService) => {
    expect(service).toBeTruthy();
  }));
});

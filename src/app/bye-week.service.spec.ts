import { TestBed, inject } from '@angular/core/testing';

import { ByeWeekService } from './bye-week.service';

describe('ByeWeekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ByeWeekService]
    });
  });

  it('should ...', inject([ByeWeekService], (service: ByeWeekService) => {
    expect(service).toBeTruthy();
  }));
});

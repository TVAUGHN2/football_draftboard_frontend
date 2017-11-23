import { TestBed, inject } from '@angular/core/testing';

import { PlayerRankingsService } from './player-rankings.service';

describe('PlayerRankingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerRankingsService]
    });
  });

  it('should ...', inject([PlayerRankingsService], (service: PlayerRankingsService) => {
    expect(service).toBeTruthy();
  }));
});

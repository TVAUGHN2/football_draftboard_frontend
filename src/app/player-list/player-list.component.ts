import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../data.model'
import { PlayerRankingsService } from '../player-rankings.service'

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() rankings: string[];
  
  constructor(public playerRankingsService: PlayerRankingsService) {}

  ngOnInit() {

  }


}


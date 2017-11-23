import { Component, OnInit, Input } from '@angular/core';
import { Drafter } from '../data.model';

@Component({
  selector: 'app-drafter-table',
  templateUrl: './drafter-table.component.html',
  styleUrls: ['./drafter-table.component.css']
})
export class DrafterTableComponent implements OnInit {
  @Input() drafter: Drafter;

  constructor() { 
  }

  ngOnInit() {
    
  }

}

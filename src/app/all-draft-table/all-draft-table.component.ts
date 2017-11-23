import { Component, OnInit, Input } from '@angular/core';
import { Drafter } from '../data.model';

@Component({
  selector: 'app-all-draft-table',
  templateUrl: './all-draft-table.component.html',
  styleUrls: ['./all-draft-table.component.css']
})
export class AllDraftTableComponent implements OnInit {

  @Input() drafters: Drafter[];
  
  constructor() { 
  }

  
  ngOnInit() {
  }

  
}




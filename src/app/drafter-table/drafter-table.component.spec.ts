import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrafterTableComponent } from './drafter-table.component';

describe('DrafterTableComponent', () => {
  let component: DrafterTableComponent;
  let fixture: ComponentFixture<DrafterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrafterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrafterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

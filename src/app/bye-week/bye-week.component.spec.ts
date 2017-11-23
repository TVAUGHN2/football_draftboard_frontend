import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByeWeekComponent } from './bye-week.component';

describe('ByeWeekComponent', () => {
  let component: ByeWeekComponent;
  let fixture: ComponentFixture<ByeWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByeWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByeWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

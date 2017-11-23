import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPlayerListsComponent } from './all-player-lists.component';

describe('AllPlayerListsComponent', () => {
  let component: AllPlayerListsComponent;
  let fixture: ComponentFixture<AllPlayerListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPlayerListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlayerListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

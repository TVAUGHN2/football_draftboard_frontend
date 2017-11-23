import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDraftTableComponent } from './all-draft-table.component';

describe('AllDraftTableComponent', () => {
  let component: AllDraftTableComponent;
  let fixture: ComponentFixture<AllDraftTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDraftTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDraftTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

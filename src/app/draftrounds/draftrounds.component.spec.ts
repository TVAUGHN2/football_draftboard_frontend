import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftroundsComponent } from './draftrounds.component';

describe('DraftroundsComponent', () => {
  let component: DraftroundsComponent;
  let fixture: ComponentFixture<DraftroundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftroundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

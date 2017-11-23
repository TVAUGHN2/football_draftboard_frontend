import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBlocksComponent } from './feature-blocks.component';

describe('FeatureBlocksComponent', () => {
  let component: FeatureBlocksComponent;
  let fixture: ComponentFixture<FeatureBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDragComponent } from './block-drag.component';

describe('BlockDragComponent', () => {
  let component: BlockDragComponent;
  let fixture: ComponentFixture<BlockDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePeopleMachinesComponent } from './choose-people-machines.component';

describe('ChoosePeopleMachinesComponent', () => {
  let component: ChoosePeopleMachinesComponent;
  let fixture: ComponentFixture<ChoosePeopleMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePeopleMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePeopleMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

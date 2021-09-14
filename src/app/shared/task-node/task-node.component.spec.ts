import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNodeComponent } from './task-node.component';

describe('TaskNodeComponent', () => {
  let component: TaskNodeComponent;
  let fixture: ComponentFixture<TaskNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

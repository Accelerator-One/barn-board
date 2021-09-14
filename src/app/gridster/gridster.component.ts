import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CoreService } from '../core.service';
import { Board } from '../interfaces';
import TestStub from './stub.test';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss'],
})
export class GridsterComponent {

  public selectedItems: Array<Board> = [];

  constructor(public boardService: CoreService) {
    // NOTE: Comment the line below before production
    this.selectedItems = TestStub;
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    // console.log(this.todo, this.done);
  }

  getCanvasWidth() {
    return ((this.selectedItems.length * 440) + 40) + "px";
  }
}
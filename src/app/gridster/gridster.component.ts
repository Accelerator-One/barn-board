import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CoreService } from '../core.service';
import { Board } from '../interfaces';
import { StreamEvent, StreamServiceService } from '../shared/stream-service/stream-service.service';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { StoreService } from '../shared/store/store.service';
import { BreakpointService } from '../shared/breakpoint.service';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss'],
})
export class GridsterComponent implements OnInit, OnDestroy {

  public dragging: Boolean = false;
  public selectedItems: Array<Board> = [];
  
  private $destroyer: Subject<void> = new Subject<void>();
  private canvasScroller: Subject <number> = new Subject <number> ();

  constructor(
    public boardService: CoreService,
    public eventService: StreamServiceService,
    public storeService: StoreService,
    public breakpointService: BreakpointService
  ) {
    this.selectedItems = this.storeService.fetchBoards();
  }

  ngOnInit() {

    this.eventService
      .listener(StreamEvent.REMOVE_TAG)
      .pipe(takeUntil(this.$destroyer))
      .subscribe(res => {
        const { x, y, it } = res;
        this.removeLabel(x, y, it);
      });

    this.canvasScroller.pipe(
      takeUntil(this.$destroyer),
      throttleTime(200)
    ).subscribe(res => {
      this.scrollHandler(res);
    });

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
    // console.log(this.selectedItems);
  }

  getConnectedComponents() {

    let length = this.selectedItems.length;
    let cmp_ids = [];

    for (let i = 0; i < length; i++)
      cmp_ids.push("board-" + i);

    return cmp_ids;
  }

  editItem(evt: any) {
    this.eventService.emit(StreamEvent.TOGGLE_ENDNAV, {
      open: true,
      action: evt
    });
  }

  removeItem(evt: Array<number>) {
    // console.log('removeItem(): ', evt);
    this.selectedItems[evt[0]].tasks = this.selectedItems[evt[0]].tasks.filter((node, it) => it !== evt[1]);
  }

  removeLabel(x: number, y: number, it: number) {
    const listRef = this.selectedItems[x].tasks[y];
    listRef.labels = listRef.labels.filter((val, index) => it !== index);
  }

  getCanvasWidth() {
    return ((this.selectedItems.length * 440) + 40) + "px";
  }

  public editBoardName() {

  }

  public editTaskDetails() {

  }

  private scrollHandler(val: Number) {
    const boardRef: any = document.querySelector('.board-canvas');
    boardRef.scrollLeft += val;
  }

  scrollLeft() {
    this.canvasScroller.next(-160);
  }

  scrollRight() {
    this.canvasScroller.next(160);
  }

  ngOnDestroy() {
    this.$destroyer.next();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { StreamEvent, StreamServiceService } from '../stream-service/stream-service.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  public hovering: Boolean = false;
  @Input('bIndex') public boardIndex = -1;

  constructor(private eventStream: StreamServiceService) { }
  ngOnInit(): void { }

  openFormDrawer() {
    this.eventStream.emit(StreamEvent.TOGGLE_ENDNAV, {
      open: true,
      action: this.boardIndex
    });
  }

}
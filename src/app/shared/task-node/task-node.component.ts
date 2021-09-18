import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RandomColorService } from '../random-color.service';
import { StreamEvent, StreamServiceService } from '../stream-service/stream-service.service';

@Component({
  selector: 'app-task-node',
  templateUrl: './task-node.component.html',
  styleUrls: ['./task-node.component.scss']
})
export class TaskNodeComponent implements OnInit {

  public color: any = '';

  @Input('info') public info: any = {};
  @Input('coords') public coords: Array<number> = [];

  @Output('edit') edit = new EventEmitter();
  @Output('remove') remove = new EventEmitter();

  constructor(
    public colorService: RandomColorService,
    private streamService: StreamServiceService
  ) { }

  ngOnInit(): void {
    this.color = this.colorService.getRandomPalette();
  }

  tagRemovalHandler(it: Number) {
    this.streamService.emit(StreamEvent.REMOVE_TAG, {
      x: this.coords[0],
      y: this.coords[1],
      it: it
    });
  }

  emitEditSignal() {
    this.edit.emit(this.coords);
  }

  emitRemoveSignal() {
    this.remove.emit(this.coords);
  }

}

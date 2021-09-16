import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RandomColorService } from '../random-color.service';

@Component({
  selector: 'app-task-node',
  templateUrl: './task-node.component.html',
  styleUrls: ['./task-node.component.scss']
})
export class TaskNodeComponent implements OnInit {

  public color: any = '';

  @Input('info') public info: any = {};
  @Input('coords') public coords: Array <number> = [];

  @Output('edit') edit = new EventEmitter();
  @Output('remove') remove = new EventEmitter();

  constructor(public colorService: RandomColorService) { }

  ngOnInit(): void {
    this.color = this.colorService.getRandomPalette();
  }

  emitEditSignal() {
    this.edit.emit(this.coords);
  }

  emitRemoveSignal() {
    this.remove.emit(this.coords);
  }

}

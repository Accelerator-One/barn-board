import { Component, Input, OnInit } from '@angular/core';
import { RandomColorService } from '../random-color.service';

@Component({
  selector: 'app-task-node',
  templateUrl: './task-node.component.html',
  styleUrls: ['./task-node.component.scss']
})
export class TaskNodeComponent implements OnInit {

  @Input('info') public info: any = {};
  constructor(public colorService: RandomColorService) { }

  ngOnInit(): void { }

}

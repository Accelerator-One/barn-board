import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-node',
  templateUrl: './task-node.component.html',
  styleUrls: ['./task-node.component.scss']
})
export class TaskNodeComponent implements OnInit {

  @Input('info') info: string = '';

  constructor() { }
  ngOnInit(): void { }

}

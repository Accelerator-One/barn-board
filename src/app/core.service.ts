import { Injectable } from '@angular/core';
import { Board } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  private boards: Array <Board> = [
    {
      name: 'TODO',
      tasks: []
    },
    {
      name: 'DONE',
      tasks: []
    }
  ];

  getBoardDetails() {
    return this.boards;
  }

  addBoard(data: Board) {
    this.boards.push(data);
  }

  deleteBoard(index: number) {
    this.boards = this.boards.filter((board, it) => it !== index);
  }

  addTask(index: number, task: Task) {
    this.boards[index].tasks.push(task);
  }

  deleteTask(board: number, pos: number) {
    const taskListRef = this.boards[board];
    taskListRef.tasks = taskListRef.tasks.filter((task, it) => it !== pos);
  }

  notifyRearrangement(board: number, start: number, end: number) {
    console.log(`List at board ${board} moved from ${start} to ${end}`);
  }

  notifyListChange(startBoard: number, startPos: number, endBoard: number, endPos: number) {
    console.log(`Item at position ${startPos} on board ${startBoard} moved on board ${endBoard} at position ${endPos}`);
  }

}

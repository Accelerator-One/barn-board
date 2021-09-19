import { Injectable } from '@angular/core';
import TestStub from '../../gridster/stub.test';
import { Board } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private boardStore: Array<Board> = [];

  constructor() {
    this.boardStore = TestStub;
  }

  public fetchBoards() {
    // NOTE: Comment the line below before production
    return this.boardStore;
  }

  public addBoard(name: string) {
    this.boardStore.push({
      name: name,
      tasks: []
    });
  }

  public addTask(it: number, task: any) {
    this.boardStore[it].tasks.push(task);
  }

}
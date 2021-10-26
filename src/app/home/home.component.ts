import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public result: Array <{name: string, value: number}> = [];
  constructor(public board: StoreService) {}

  ngOnInit() {

    const boards: Array<any> = this.board.fetchBoards();
    boards.forEach((board: any) => {
      this.result.push({
        name: board.name,
        value: board.tasks.length
      })
    });
    
  }

}
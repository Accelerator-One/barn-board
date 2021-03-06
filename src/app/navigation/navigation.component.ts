import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { LoaderService } from '../shared/loader.service';
import { BreakpointService } from '../shared/breakpoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public boardService: CoreService,
    public dialog: DialogService,
    private loader: LoaderService,
    private router: Router,
    public breakpointService: BreakpointService) { }

  ngOnInit() {

    const url = this.router.url;
    let param = url.split('/');

    if(param[param.length-1] === '') {
      this.router.navigate(['home']);
    }
  }

  loaderPrototype() {
    this.loader.show();
    setTimeout(() => {
      this.loader.hide();
    }, 2400);
  }

  addNewBoard() {
    this.dialog.openDialog('board');
  }

  isDashBoardRoute() {
    return this.router.url.endsWith('board');
  }

}

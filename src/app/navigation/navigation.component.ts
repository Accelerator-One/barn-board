import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CoreService } from '../core.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public boardService: CoreService,
    public dialog: DialogService,
    private loader: LoaderService) { }

  loaderPrototype() {
    this.loader.show();
    setTimeout(() => {
      this.loader.hide();
    }, 2400);
  }

}

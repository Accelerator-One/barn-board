import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StreamEvent, StreamServiceService } from '../stream-service/stream-service.service';

@Component({
  selector: 'app-form-drawer',
  templateUrl: './form-drawer.component.html',
  styleUrls: ['./form-drawer.component.scss']
})
export class FormDrawerComponent implements OnInit, OnDestroy {

  constructor(private streamService: StreamServiceService) { }

  ngOnInit(): void {
    this.streamService
      .listener(StreamEvent.TOGGLE_ENDNAV)
      .pipe(takeUntil(this.$destroyer))
      .subscribe(res => {
        if (res?.open)
          this.openDrawer(res?.action);
        else
          this.closeDrawer();
      });
  }

  public open: boolean = false;
  public action: String = '';
  public $destroyer: Subject<void> = new Subject<void>();

  openDrawer(action: String = '') {
    this.open = true;
  }

  closeDrawer() {
    this.open = false;
  }

  ngOnDestroy() {
    this.$destroyer.next();
  }
}

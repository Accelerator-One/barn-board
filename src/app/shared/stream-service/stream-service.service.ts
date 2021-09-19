import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil, throttleTime } from 'rxjs/operators';
import { Stream } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StreamServiceService implements OnDestroy {

  private centralSubject: Subject<Stream> = new Subject<Stream>();
  private $destroyer: Subject<void> = new Subject<void>();

  constructor() { }

  public emit(evt: StreamEvent, data: any) {
    this.centralSubject.next({
      uid: evt,
      message: data
    });
  }

  public listener(id: StreamEvent) {
    return this.centralSubject
      .asObservable()
      .pipe(
        takeUntil(this.$destroyer),
        filter(evt => evt.uid === id),
        throttleTime(50),
        map(evt => evt?.message)
      )
  }

  ngOnDestroy() {
    this.$destroyer.next();
  }

}

export enum StreamEvent {
  REMOVE_TAG,
  TOGGLE_ENDNAV
};

import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appHideOnHover]'
})
export class HideOnHoverDirective implements OnInit, OnDestroy {

  public dragSubject: Subject<Boolean> = new Subject<Boolean>();
  public destroyer: Subject<void> = new Subject<void>();

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.dragSubject
      .pipe(
        takeUntil(this.destroyer),
        debounceTime(1200))
      .subscribe(res => {
        if (res)
          this.elRef.nativeElement.style.display = 'flex';
        else
          this.elRef.nativeElement.style.display = 'none';
      });
  }

  @HostListener('mouseenter') hide() {
    this.dragSubject.next(false);
  }

  @HostListener('mouseleave') show() {
    this.dragSubject.next(true);
  }

  ngOnDestroy() {
    this.destroyer.next();
  }

}

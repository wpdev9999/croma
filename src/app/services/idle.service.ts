import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {

  public idle$: Subject<boolean> = new Subject();
  public wake$: Subject<boolean> = new Subject();

  isIdle = false;
  private idleAfterSeconds = 10;
  private countDown:any;
  
  constructor() { 
      // Setup events
      fromEvent(document, 'mousemove').subscribe(() => this.onInteraction());
      fromEvent(document, 'touchstart').subscribe(() => this.onInteraction());
      fromEvent(document, 'keydown').subscribe(() => this.onInteraction());
  }

  onInteraction() {
    // Is idle and interacting, emit Wake
    if (this.isIdle) {
      this.isIdle = false;
      this.wake$.next(true);
    }
    // User interaction, reset start-idle-timer
    clearTimeout(this.countDown);
    console.log(typeof this.countDown);
    
    this.countDown = setTimeout(() => {
        // Countdown done without interaction - emit Idle
        this.isIdle = true;
        this.idle$.next(true);
    }, this.idleAfterSeconds * 1_000)

  }

}

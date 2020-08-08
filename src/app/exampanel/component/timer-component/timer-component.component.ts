import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { Observable, range } from "rxjs";
import { timer, zip } from "rxjs";
@Component({
  selector: "timer",
  template: "<p>{{message}}</p>",
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
})
export class TimerComponentComponent implements OnInit, OnDestroy {
  // @Input() value: number;
  // @Output("onComplete") timerOver: EventEmitter<any> = new EventEmitter<any>();
  // timerValue;
  // areTenSecsRemainings: boolean = false;
  // constructor() {}

  // ngOnInit() {
  //   let source$ = range(0, this.value)
  //     .buffer(timer(0, 1000), (x) => {
  //       return x;
  //     })
  //     .map((x) => {
  //       return this.value - x;
  //     });

  //   source$.subscribe(
  //     (seconds) => {
  //       // console.log(seconds)
  //       let mins = parseInt("" + seconds / 60);
  //       let secs = seconds % 60;
  //       let hrs = parseInt("" + mins / 60);
  //       mins = mins % 60;
  //       if (secs < 11) this.areTenSecsRemainings = true;
  //       let res = {
  //         hours: hrs,
  //         minutes: mins,
  //         seconds: secs,
  //       };

  //       this.timerValue = res;
  //     },
  //     () => this.timerOver.emit("TIMER ERROR"),
  //     () => this.timerOver.emit("TIMER OVER")
  //   );
  // }
  intervalId = 0;
  message = "";
  seconds = 11;

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.start();
  }
  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.countDown();
  }
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = "Exam Over";
      } else {
        if (this.seconds < 0) {
          // this.seconds = 10;
        } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}

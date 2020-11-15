
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class DownloadService {
    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
      }
 
}




import {Component, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Component({template: ''})
export abstract class BaseComponent implements OnDestroy {

  protected unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

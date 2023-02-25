import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loader = new BehaviorSubject(false)
  public loader$: Observable<boolean> = this._loader.asObservable()

  public show() {
    this._loader.next(true)
  }

  public hide() {
    this._loader.next(false)
  }
}

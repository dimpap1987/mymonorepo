import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUser, loadUser, User} from "../+state";
import {Observable} from "rxjs";

@Injectable()
export class AppLoader {

  user$: Observable<any>;

  constructor(private store: Store<{ user: User }>) {
    this.user$ = this.store.select(getUser);
  }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(loadUser());
      resolve(true)
    })
  }
}

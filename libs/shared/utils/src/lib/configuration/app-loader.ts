import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUser, loadUser, User} from "../+state";
import {filter, Observable, take} from "rxjs";
import {WebSocketService} from "../services";

@Injectable()
export class AppLoader {

  user$: Observable<any>;

  constructor(private store: Store<{ user: User }>,
              private webSocketService: WebSocketService) {
    this.user$ = this.store.select(getUser);
  }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(loadUser());
      this.user$.pipe(
        filter(user => !!user),
        take(1))
        .subscribe(user => {
          this.webSocketService.connect()
          resolve(user);
        });
    })
  }
}

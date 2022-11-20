import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ConstantsClient} from "../../contants/constants-client";

@Injectable({
  providedIn: "root",
})
export class UserApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getUser(): Observable<any> {
    return this.http.get(ConstantsClient.endpoints().api.me);
  }
}

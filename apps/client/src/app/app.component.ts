import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '@mymonorepo/api-interfaces';

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/v1/hello');

  constructor(private http: HttpClient) {
  }
}

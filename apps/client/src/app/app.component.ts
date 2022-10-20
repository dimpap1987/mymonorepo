import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";
import {filter, map, take} from "rxjs";
import {UserApiService} from "@mymonorepo/shared/utils";

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute,private userApiService:UserApiService) {
  }

  ngOnInit(): void {
    // this.route.queryParams.pipe(
    //   map(param => param['token']),
    //   filter(Boolean),
    //   take(1)
    // ).subscribe(token => {
    //   sessionStorage.setItem("token",token)
    // });
  }
}

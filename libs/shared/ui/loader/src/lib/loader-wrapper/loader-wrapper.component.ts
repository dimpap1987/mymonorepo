import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'dp-loader-wrapper',
  templateUrl: './loader-wrapper.component.html',
  styleUrls: ['./loader-wrapper.component.scss'],
})
export class LoaderWrapperComponent {
  showSpinner$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.showSpinner$ = this.loaderService.loader$;
  }
}

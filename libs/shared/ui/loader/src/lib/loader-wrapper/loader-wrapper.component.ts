import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LoaderService } from '../loader.service'

@Component({
  selector: 'dp-loader-wrapper',
  templateUrl: './loader-wrapper.component.html',
  styleUrls: ['./loader-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderWrapperComponent {
  constructor(public loaderService: LoaderService) {}
}

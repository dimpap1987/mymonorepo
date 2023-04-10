import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dp-desktop-template',
  templateUrl: './desktop-template.component.html',
  styleUrls: ['./desktop-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopTemplateComponent {}

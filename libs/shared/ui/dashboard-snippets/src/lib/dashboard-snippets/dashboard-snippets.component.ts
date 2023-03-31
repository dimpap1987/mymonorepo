import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'dp-dashboard-snippets',
  templateUrl: './dashboard-snippets.component.html',
  styleUrls: ['./dashboard-snippets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSnippetsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

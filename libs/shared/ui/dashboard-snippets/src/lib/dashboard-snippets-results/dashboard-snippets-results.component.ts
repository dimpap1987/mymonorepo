import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'dp-dashboard-snippets-results',
  templateUrl: './dashboard-snippets-results.component.html',
  styleUrls: ['./dashboard-snippets-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSnippetsResultsComponent implements OnInit {
  snippets: any[]

  constructor() {}

  ngOnInit(): void {
    // fetch snippets here
  }
}

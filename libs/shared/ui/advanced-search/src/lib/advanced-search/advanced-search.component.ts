import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'dp-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchComponent implements OnInit {
  search: string
  suggestions: []

  constructor() {}

  ngOnInit(): void {}
}

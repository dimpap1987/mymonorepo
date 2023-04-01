import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormSubmitInterface } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'

@Component({
  selector: 'dp-dashboard-snippets-create',
  templateUrl: './dashboard-snippets-create.component.html',
  styleUrls: ['./dashboard-snippets-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSnippetsCreateComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  handleSubmit(form: FormSubmitInterface) {
    console.log(form)
  }
}

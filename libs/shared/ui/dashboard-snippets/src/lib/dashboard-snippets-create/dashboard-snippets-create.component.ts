import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { LoaderService } from '@mymonorepo/shared/ui/loader'
import { FormSubmitInterface } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'

@Component({
  selector: 'dp-dashboard-snippets-create',
  templateUrl: './dashboard-snippets-create.component.html',
  styleUrls: ['./dashboard-snippets-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSnippetsCreateComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private loaderService: LoaderService) {}

  ngOnInit(): void {}

  handleSubmit(form: FormSubmitInterface) {
    console.log('form', form)
  }

  handleLoading(loading: boolean): void {
    if (loading) {
      this.loaderService.show()
    } else {
      this.loaderService.hide()
    }
  }
}

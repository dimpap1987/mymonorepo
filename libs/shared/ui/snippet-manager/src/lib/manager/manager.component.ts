import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormSubmitInterface } from 'libs/shared/ui/snippet-lib/create-snippet/src/lib/create-snippet-form/create-snippet-form.component'

@Component({
  selector: 'dp-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ManagerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleSubmit(data: FormSubmitInterface) {
    console.log(data)
  }
}

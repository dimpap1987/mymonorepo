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

  workspaceCreated(event: any) {
    console.log(event)
  }
  entityCreated(event: any) {
    console.log(event)
  }
  entityRenamed(event: any) {
    console.log(event)
  }
  entityDeleted(event: any) {
    console.log(event)
  }
  dragDropEvent(event: any) {
    console.log(event)
  }
  nodeSelectEvent(event: any) {
    console.log(event)
  }
}

import { Component } from '@angular/core'
import { LoaderService } from '@mymonorepo/shared/ui/loader'
import { FormSubmitInterface } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
  selector: 'dp-snippet-dialog',
  templateUrl: './snippet-dialog.component.html',
  styleUrls: ['./snippet-dialog.component.scss'],
})
export class SnippetDialogComponent {
  isLoading = false

  constructor(private loaderService: LoaderService, public ref: DynamicDialogRef) {}

  async handleSubmit(form: FormSubmitInterface) {
    this.loaderService.show()
    this.isLoading = true
    const d = await form.promise
    // save snippet form here
    console.log('form', d)
    this.loaderService.hide()
    this.isLoading = false
    this.ref.close()
    // setTimeout(()=>{
    // },1000)
  }
}

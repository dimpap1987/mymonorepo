import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedUiSnippetLibCreateSnippetModule } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { DynamicDialogModule } from 'primeng/dynamicdialog'
import { SnippetDialogComponent } from './snippet-dialog/snippet-dialog.component'

@NgModule({
  imports: [CommonModule, DynamicDialogModule, SharedUiSnippetLibCreateSnippetModule],
  declarations: [SnippetDialogComponent],
  exports: [SnippetDialogComponent],
})
export class SharedUiSnippetDialogModule {}

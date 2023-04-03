import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag'
import { SnippetCardComponent } from './snippet-card/snippet-card.component'

@NgModule({
  imports: [CommonModule, CardModule, TagModule],
  declarations: [SnippetCardComponent],
  exports: [SnippetCardComponent],
})
export class SharedUiSnippetCardModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component'
@NgModule({
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  declarations: [AdvancedSearchComponent],
  exports: [AdvancedSearchComponent],
})
export class SharedUiAdvancedSearchModule {}

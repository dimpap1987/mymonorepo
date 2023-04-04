import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component'

@NgModule({
  imports: [CommonModule, InputTextModule, FormsModule],
  declarations: [AdvancedSearchComponent],
  exports: [AdvancedSearchComponent],
})
export class SharedUiAdvancedSearchModule {}

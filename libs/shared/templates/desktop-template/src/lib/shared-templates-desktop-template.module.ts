import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedUiLoaderModule } from '@mymonorepo/shared/ui/loader'
import { DesktopTemplateComponent } from './desktop-template/desktop-template.component'
@NgModule({
  imports: [CommonModule, SharedUiLoaderModule],
  declarations: [DesktopTemplateComponent],
  exports: [DesktopTemplateComponent],
})
export class SharedTemplatesDesktopTemplateModule {}

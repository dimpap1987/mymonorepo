import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LoaderWrapperComponent } from './loader-wrapper/loader-wrapper.component'
import { LoaderComponent } from './loader/loader.component'

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, LoaderWrapperComponent],
  exports: [LoaderWrapperComponent],
})
export class SharedUiLoaderModule {}

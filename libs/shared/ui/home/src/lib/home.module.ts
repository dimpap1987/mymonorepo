import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedUiLoaderModule } from '@mymonorepo/shared/ui/loader'
import { SharedUiSnippetEditorModule } from '@mymonorepo/shared/ui/snippet-editor'
import { SharedUiToolbarModule } from '@mymonorepo/shared/ui/toolbar'
import { LandingPageComponent } from './landing-page/landing-page.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
]

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiSnippetEditorModule,
    SharedUiToolbarModule,
    SharedUiLoaderModule,
  ],
  exports: [LandingPageComponent],
})
export class HomeModule {}

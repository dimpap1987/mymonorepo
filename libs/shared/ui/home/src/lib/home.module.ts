import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedTemplatesDesktopTemplateModule } from '@mymonorepo/shared/templates/desktop-template'
import { SharedUiLoaderModule } from '@mymonorepo/shared/ui/loader'
import { SharedUiNavbarModule } from '@mymonorepo/shared/ui/navbar'
import { SharedUiToolbarModule } from '@mymonorepo/shared/ui/toolbar'
import { LandingPageComponent } from './landing-page/landing-page.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@mymonorepo/shared/ui/snippets').then(m => m.SharedUiSnippetsModule),
        pathMatch: 'full',
      },
    ],
  },
]

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiToolbarModule,
    SharedUiLoaderModule,
    SharedTemplatesDesktopTemplateModule,
    SharedUiNavbarModule,
  ],
  exports: [LandingPageComponent],
})
export class HomeModule {}

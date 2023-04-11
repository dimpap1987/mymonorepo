import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { GithubBoardComponent } from './github-board/github-board.component'

@NgModule({
  imports: [CommonModule, DropdownModule, ButtonModule, FormsModule],
  declarations: [GithubBoardComponent],
  exports: [GithubBoardComponent],
})
export class SharedUiGithubModule {}

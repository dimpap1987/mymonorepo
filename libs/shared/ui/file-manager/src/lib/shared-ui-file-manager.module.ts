import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfirmationService, TreeDragDropService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { TreeModule } from 'primeng/tree'
import { FileManagerComponent } from './file-manager/file-manager.component'

@NgModule({
  imports: [CommonModule, TreeModule, FormsModule, ConfirmPopupModule],
  declarations: [FileManagerComponent],
  exports: [FileManagerComponent],
  providers: [TreeDragDropService, ConfirmationService],
})
export class SharedUiFileManagerModule {}

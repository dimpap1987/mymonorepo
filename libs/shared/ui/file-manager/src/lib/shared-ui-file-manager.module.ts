import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { TreeDragDropService } from 'primeng/api'
import { TreeModule } from 'primeng/tree'
import { FileManagerComponent } from './file-manager/file-manager.component'
@NgModule({
  imports: [CommonModule, TreeModule, FormsModule],
  declarations: [FileManagerComponent],
  exports: [FileManagerComponent],
  providers: [TreeDragDropService],
})
export class SharedUiFileManagerModule {}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core'
import { TreeNode } from 'primeng/api'

@Component({
  selector: 'dp-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerComponent implements OnInit, AfterViewInit {
  @ViewChildren('nodeInput') nodeInput: QueryList<ElementRef>

  files: TreeNode[]
  selectedNode: TreeNode

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', () => {
      this.handleFolderSave(this.selectedNode)
    })
  }

  ngAfterViewInit(): void {
    this.nodeInput.changes.subscribe(input => {
      input.first?.nativeElement.focus()
      input.first?.nativeElement?.addEventListener('keyup', (e: any) => {
        if (e.key === 'Enter') {
          this.handleFolderSave(this.selectedNode)
        }
      })
    })
  }

  ngOnInit(): void {
    //TODO fetch files from db . if null insert the above file
    this.files = [
      {
        label: 'snippets',
        key: 'base',
        data: 'snippets',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
      },
    ]
  }

  nodeSelect(event: any) {
    this.handleFolderSave(this.selectedNode)
    this.selectedNode = event.node
  }

  addFolder() {
    this.handleFolderFileCreation({
      key: 'folder-create',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      styleClass: 'folder-create',
    })
  }

  addFile() {
    this.handleFolderFileCreation({
      key: 'file-create',
      expandedIcon: 'pi pi-file',
      collapsedIcon: 'pi pi-file',
      leaf: true,
    })
  }

  renameFile() {
    setTimeout(() => {
      this.selectedNode.key = 'file-rename'
      this.selectedNode.data = { ...this.selectedNode.data, previousLabel: this.selectedNode.label }
      this.selectedNode.label = undefined
      this.cdr.detectChanges()
    }, 0)
  }

  deleteFile() {
    setTimeout(() => {
      this.handleDeleteFolderOrFile(this.selectedNode)
    }, 0)
  }

  handleFolderSave(node: TreeNode) {
    if (node?.key === 'folder-create' || node?.key === 'file-create') {
      if (node.label && node.label?.trim()?.length !== 0) {
        node.key = undefined
      } else {
        //delete file
        this.handleDeleteFolderOrFile(node)
      }
      this.cdr.detectChanges()
    } else if (node?.key === 'file-rename') {
      if (!node.label || node.label?.trim()?.length === 0) {
        node.label = node.data?.previousLabel
      }
      node.key = undefined
      this.cdr.detectChanges()
    }
  }

  handleFolderFileCreation(obj: TreeNode) {
    setTimeout(() => {
      if (this.selectedNode?.leaf) return
      this.selectedNode.expanded = true
      const childrenNode = this.selectedNode.children
        ? this.selectedNode.children
        : (this.selectedNode.children = [])

      childrenNode.unshift(obj)
      this.selectedNode = childrenNode[0]
      this.cdr.detectChanges()
    }, 0)
  }

  handleDeleteFolderOrFile(node: TreeNode) {
    node.key = 'folder-delete'
    const nodes = node.parent?.children
    if (!nodes) return
    nodes.forEach((node: TreeNode, index: number) => {
      if (node.key === 'folder-delete') nodes.splice(index, 1)
    })
    this.cdr.detectChanges()
  }
}

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
  selectedNode: TreeNode | undefined
  workspaceInit: TreeNode = {
    key: 'create-workspace',
    expandedIcon: 'pi pi pi-code',
    collapsedIcon: 'pi pi-code',
    styleClass: 'workspace-node',
  }

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
    this.files = []
  }

  nodeSelect(event: any) {
    this.handleFolderSave(this.selectedNode)
    this.selectedNode = event.node
  }

  addFolder(event: Event) {
    const obj = {
      key: 'folder-create',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      parent: undefined,
    }
    this.handleFolderFileCreation(obj)
  }

  addFile(event: Event) {
    const file = {
      key: 'folder-create',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
    }
    this.handleFolderFileCreation(file)
  }

  renameFile() {
    setTimeout(() => {
      if (!this.selectedNode) return
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

  handleFolderSave(node: TreeNode | undefined) {
    if (!node) {
      console.warn('Node is null')
      this.selectedNode = this.files[0]
    }
    if (node?.key === 'folder-create' || node?.key === 'file-create') {
      if (node.label && node.label?.trim()?.length !== 0) {
        node.key = undefined
      } else {
        this.handleDeleteFolderOrFile(node)
      }
      this.cdr.detectChanges()
    } else if (node?.key === 'file-rename') {
      if (!node.label || node.label?.trim()?.length === 0) {
        node.label = node.data?.previousLabel
      }
      node.key = undefined
      this.cdr.detectChanges()
    } else if (node?.key === 'create-workspace') {
      if (node.label && node.label?.trim()?.length !== 0) {
        node.key = 'workspace'
      } else {
        this.handleDeleteFolderOrFile(node)
      }
      this.cdr.detectChanges()
    }
  }

  handleFolderFileCreation(obj: TreeNode) {
    setTimeout(() => {
      if (!this.selectedNode) {
        return
      }
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

  handleDeleteFolderOrFile(node: TreeNode | undefined) {
    if (!node) return
    node.key = 'folder-delete'
    const nodes = node.parent?.children || this.files
    nodes?.forEach((node: TreeNode, index: number) => {
      if (node.key === 'folder-delete') nodes?.splice(index, 1)
    })
    this.selectedNode = undefined
    this.cdr.detectChanges()
  }

  createWorkSpace() {
    this.files.push({ ...this.workspaceInit })
  }
}

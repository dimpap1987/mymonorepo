import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core'
import { ConfirmationService, TreeNode } from 'primeng/api'

@Component({
  selector: 'dp-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerComponent implements AfterViewInit {
  @Input()
  files: TreeNode[]
  @ViewChildren('nodeInput') nodeInput: QueryList<ElementRef>

  @Output() workspaceCreated: EventEmitter<any> = new EventEmitter<any>()
  @Output() entityCreated: EventEmitter<any> = new EventEmitter<any>()
  @Output() entityRenamed: EventEmitter<any> = new EventEmitter<any>()
  @Output() entityDeleted: EventEmitter<any> = new EventEmitter<any>()
  @Output() dragDropEvent: EventEmitter<any> = new EventEmitter<any>()
  @Output() nodeSelectEvent: EventEmitter<any> = new EventEmitter<any>()

  selectedNode: TreeNode | undefined
  workspaceInit: TreeNode = {
    key: 'create-workspace',
    expandedIcon: 'pi pi pi-code',
    collapsedIcon: 'pi pi-code',
    styleClass: 'workspace-init',
    data: {
      type: 'workspace',
    },
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private confirmationService: ConfirmationService
  ) {
    this.renderer.listen('window', 'click', e => {
      if (!e.target?.classList?.contains('node-input')) {
        this.handleFolderOrFileExistence(this.selectedNode)
      }
    })
  }

  ngAfterViewInit(): void {
    this.nodeInput.changes.subscribe(input => {
      input.last?.nativeElement.focus()
    })
  }

  nodeSelect(event: any) {
    if (!event.originalEvent?.target?.classList?.contains('node-input')) {
      this.handleFolderOrFileExistence(this.selectedNode)
    }
    this.selectedNode = event.node
    if (this.selectedNode?.label) {
      this.nodeSelectEvent.emit({
        nodeSelect: true,
        selectedNode: this.selectedNode,
      })
    }
  }

  addFolder(event: Event) {
    const obj: TreeNode = {
      key: 'folder-create',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      styleClass: 'folder-node',
      data: {
        type: 'folder',
      },
    }
    this.handleFolderFileCreation(obj)
  }

  addFile(event: Event) {
    const file: TreeNode = {
      key: 'file-create',
      expandedIcon: 'pi pi-file',
      collapsedIcon: 'pi pi-file',
      styleClass: 'file-node',
      leaf: true,
      droppable: false,
      data: {
        type: 'file',
      },
    }
    this.handleFolderFileCreation(file)
  }

  renameFile() {
    setTimeout(() => {
      if (!this.selectedNode) return
      this.selectedNode.key = 'file-rename'
      this.selectedNode.data = {
        ...this.selectedNode.data,
        previousLabel: this.selectedNode.label,
      }
      this.selectedNode.label = undefined
      this.cdr.detectChanges()
    }, 0)
  }

  deleteFile() {
    setTimeout(() => {
      this.confirm({
        target: document.getElementById(`${this.selectedNode?.data?.path}`) as EventTarget,
        message: `Proceed with deleting : "${this.selectedNode?.label}" ?`,
        icon: 'pi pi-exclamation-triangle',
      }).then(accept => {
        if (!accept) return
        const deletedNode = this.handleDeleteFolderOrFile(this.selectedNode)
        this.entityDeleted.emit({
          entityDeleted: true,
          deletedNode: deletedNode,
          files: this.files,
        })
      })
    })
  }

  handleFolderOrFileExistence(node: TreeNode | undefined) {
    if (!node) {
      console.warn('Node is null')
      this.selectedNode = this.files[0]
    }
    if (node?.key === 'folder-create' || node?.key === 'file-create') {
      if (node.label && node.label?.trim()?.length !== 0) {
        const type = 'folder-create' === node?.key ? 'folderCreated' : 'fileCreated'
        this.setNodePath(node, node.parent)
        this.entityCreated.emit({
          [type]: true,
          selectedNode: this.selectedNode,
          files: this.files,
        })
        node.key = undefined
      } else {
        this.handleDeleteFolderOrFile(node)
      }
      this.cdr.detectChanges()
    } else if (node?.key === 'file-rename') {
      if (!node.label || node.label?.trim()?.length === 0) {
        node.label = node.data?.previousLabel
      } else {
        const previousNode = { ...this.selectedNode, label: node.data?.previousLabel }
        this.setNodePath(node, node.parent)
        this.entityRenamed.emit({
          entityRenamed: true,
          selectedNode: this.selectedNode,
          previousNode: previousNode,
          files: this.files,
        })
      }
      node.key = undefined
      this.cdr.detectChanges()
    } else if (node?.key === 'create-workspace') {
      if (node.label && node.label?.trim()?.length !== 0) {
        node.key = undefined
        node.styleClass = 'workspace-node'
        this.setNodePath(node, node.parent)
        this.workspaceCreated.emit({
          workspaceCreated: true,
          files: this.files,
        })
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
    const deletedNode = { ...this.selectedNode }
    this.selectedNode = undefined
    this.cdr.detectChanges()
    return deletedNode
  }

  createWorkSpace() {
    if (this.files[0]?.key === 'create-workspace') {
      return
    }
    this.files.push({ ...this.workspaceInit })
  }

  dropNode(event: any) {
    const tree = this.searchNodeRecursion(this.files[0], {
      ...event.dragNode,
      data: {
        ...event.dragNode.data,
      },
    })

    if (tree) {
      tree.data.previousPath = tree.data.path
      tree.data.path = event.dropNode.data.path + '/' + tree.label
      this.dragDropEvent.emit({
        dragNode: tree,
        files: this.files,
      })
    }
  }

  inputKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.handleFolderOrFileExistence(this.selectedNode)
      this.cdr.detectChanges()
    }
  }

  private setNodePath(node: TreeNode, parent: TreeNode | undefined) {
    let p1 = parent
    let path = ''
    while (p1) {
      path = p1.label + '/' + path
      p1 = p1.parent
    }
    node.data = {
      ...node.data,
      path: '/' + path + node.label,
    }
    return node
  }

  showActionButtons() {
    if (this.files.length === 1) {
      return this.files[0].key !== 'create-workspace'
    }
    return this.files.length > 0
  }

  searchNodeRecursion(tree: TreeNode, target: TreeNode) {
    if (tree.data.path === target.data.path) return tree
    if (tree.children) {
      for (const child of tree.children) {
        const found = this.searchNodeRecursion(child, target) as TreeNode
        if (found) return found
      }
    }
    return
  }

  confirm({ target, message, icon }: any): Promise<boolean> {
    return new Promise(resolve => {
      this.confirmationService.confirm({
        target: target,
        message: message,
        icon: icon,
        accept: () => {
          resolve(true)
        },
        reject: () => {
          this.confirmationService.close()
          resolve(false)
        },
      })
    })
  }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
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

  @Output() workspaceCreated: EventEmitter<any> = new EventEmitter<any>()
  @Output() entityCreated: EventEmitter<any> = new EventEmitter<any>()
  @Output() entityRenamed: EventEmitter<any> = new EventEmitter<any>()
  @Output() entityDeleted: EventEmitter<any> = new EventEmitter<any>()
  @Output() dragDropEvent: EventEmitter<any> = new EventEmitter<any>()
  @Output() nodeSelectEvent: EventEmitter<any> = new EventEmitter<any>()

  files: TreeNode[]
  selectedNode: TreeNode | undefined
  workspaceInit: TreeNode = {
    key: 'create-workspace',
    expandedIcon: 'pi pi pi-code',
    collapsedIcon: 'pi pi-code',
    styleClass: 'workspace-node',
  }

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {
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

  ngOnInit(): void {
    //TODO fetch files from db . if null insert the above file
    this.files = []
  }

  nodeSelect(event: any) {
    if (!event.originalEvent?.target?.classList?.contains('node-input')) {
      this.handleFolderOrFileExistence(this.selectedNode)
    }
    this.selectedNode = event.node
    this.nodeSelectEvent.emit({
      nodeSelect: true,
      selectedNode: this.selectedNode,
    })
  }

  addFolder(event: Event) {
    const obj: TreeNode = {
      key: 'folder-create',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
    }
    this.handleFolderFileCreation(obj)
  }

  addFile(event: Event) {
    const file: TreeNode = {
      key: 'file-create',
      expandedIcon: 'pi pi-file',
      collapsedIcon: 'pi pi-file',
      leaf: true,
      droppable: false,
    }
    this.handleFolderFileCreation(file)
  }

  renameFile() {
    setTimeout(() => {
      if (!this.selectedNode) return
      const previousKey = this.selectedNode.key
      this.selectedNode.key = 'file-rename'
      this.selectedNode.data = {
        ...this.selectedNode.data,
        previousLabel: this.selectedNode.label,
        previousKey: previousKey,
      }
      this.selectedNode.label = undefined
      this.cdr.detectChanges()
    }, 0)
  }

  deleteFile() {
    setTimeout(() => {
      this.handleDeleteFolderOrFile(this.selectedNode)
      this.entityDeleted.emit({
        entityDeleted: true,
        selectedNode: this.selectedNode,
        files: this.files,
      })
    }, 0)
  }

  handleFolderOrFileExistence(node: TreeNode | undefined) {
    if (!node) {
      console.warn('Node is null')
      this.selectedNode = this.files[0]
    }
    if (node?.key === 'folder-create' || node?.key === 'file-create') {
      if (node.label && node.label?.trim()?.length !== 0) {
        const key = 'folder-create' === node?.key ? 'folderCreated' : 'fileCreated'
        this.entityCreated.emit({
          [key]: true,
          selectedNode: this.selectedNode,
          files: this.files,
        })
        node.key = 'folder-create' === node?.key ? 'folder' : 'file'
      } else {
        this.handleDeleteFolderOrFile(node)
      }
      this.cdr.detectChanges()
    } else if (node?.key === 'file-rename') {
      if (!node.label || node.label?.trim()?.length === 0) {
        node.label = node.data?.previousLabel
        node.key = node.data?.previousKey
      } else {
        node.key = node.data?.previousKey
        this.entityRenamed.emit({
          entityRenamed: true,
          selectedNode: this.selectedNode,
          files: this.files,
        })
      }
      this.cdr.detectChanges()
    } else if (node?.key === 'create-workspace') {
      if (node.label && node.label?.trim()?.length !== 0) {
        node.key = 'workspace'
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
    this.selectedNode = undefined
    this.cdr.detectChanges()
  }

  createWorkSpace() {
    this.files.push({ ...this.workspaceInit })
  }

  dropNode(event: any) {
    this.dragDropEvent.emit({
      dragNode: event.dragNode,
      dropNode: event.dropNode,
      files: this.files,
    })
  }

  inputKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.handleFolderOrFileExistence(this.selectedNode)
      this.cdr.detectChanges()
    }
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { FormSubmitInterface } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { TreeNode } from 'primeng/api'
import { TabView } from 'primeng/tabview'

export interface TabManager {
  title: string
  path: string
  index: number
  fileDeleted?: boolean
}
@Component({
  selector: 'dp-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ManagerComponent implements OnInit {
  @ViewChild('tabView') tabView: TabView
  files: TreeNode[]
  isSnippetFormDisplayed = false
  tabs: TabManager[] = []
  activeIndex = 0

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.files = [
    //   {
    //     expandedIcon: 'pi pi pi-code',
    //     collapsedIcon: 'pi pi-code',
    //     styleClass: 'workspace-node',
    //     data: {
    //       type: 'workspace',
    //       path: '/workspace',
    //     },
    //     label: 'workspace',
    //     expanded: true,
    //     children: [
    //       {
    //         expandedIcon: 'pi pi-folder-open',
    //         collapsedIcon: 'pi pi-folder',
    //         styleClass: 'folder-node',
    //         data: {
    //           type: 'folder',
    //           path: '/workspace/java',
    //         },
    //         label: 'java',
    //         expanded: true,
    //         children: [
    //           {
    //             expandedIcon: 'pi pi-file',
    //             collapsedIcon: 'pi pi-file',
    //             styleClass: 'file-node',
    //             leaf: true,
    //             droppable: false,
    //             data: {
    //               type: 'file',
    //               path: '/workspace/java/App.java',
    //             },
    //             label: 'App.java',
    //           },
    //         ],
    //       },
    //       {
    //         expandedIcon: 'pi pi-folder-open',
    //         collapsedIcon: 'pi pi-folder',
    //         styleClass: 'folder-node',
    //         data: {
    //           type: 'folder',
    //           path: '/workspace/javascript',
    //         },
    //         label: 'javascript',
    //         expanded: true,
    //         children: [
    //           {
    //             expandedIcon: 'pi pi-file',
    //             collapsedIcon: 'pi pi-file',
    //             styleClass: 'file-node',
    //             leaf: true,
    //             droppable: false,
    //             data: {
    //               type: 'file',
    //               path: '/workspace/javascript/app.js',
    //             },
    //             label: 'app.js',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ]
    this.files = []
  }

  handleSubmit(data: FormSubmitInterface) {
    console.log(data)
  }

  workspaceCreated(event: any) {
    console.log(event)
  }

  entityCreated(event: any) {
    console.log(event)
    this.createSnippetForm(event.selectedNode)
  }

  entityRenamed(event: any) {
    console.log(event)
    this.handleRename(event)
  }

  entityDeleted(event: any) {
    console.log(event)
    this.handleDelete(event)
  }

  dragDropEvent(event: any) {
    this.handleDragDrop(event)
  }

  nodeSelectEvent(event: any) {
    console.log(event)
    this.createSnippetForm(event.selectedNode)
  }

  createSnippetForm(selectedNode: TreeNode) {
    if (selectedNode?.data?.type === 'file') {
      if (!this.tabs.some(tab => tab.path === selectedNode?.data?.path)) {
        this.tabs.push({
          title: selectedNode.label as string,
          path: selectedNode.data.path,
          index: this.tabs.length,
        })
      }
      this.handleTabSelection(selectedNode)
    }
  }

  private handleTabSelection(selectedNode: TreeNode) {
    const tab = this.tabs.find((tab: TabManager) => tab.path === selectedNode.data.path)
    if (tab) {
      this.goToTab(tab.index)
    }
  }

  private goToTab(tab: number) {
    setTimeout(() => {
      this.activeIndex = tab
      this.cdr.detectChanges()
    })
  }

  private handleRename(event: any) {
    this.files = event.files
    this.tabs.forEach(tab => {
      if (tab.path === event.previousNode?.data?.path) {
        tab.path = event.selectedNode?.data?.path
        tab.title = event.selectedNode.label
      }
    })
  }

  private handleDragDrop(event: any) {
    this.files = event.files
    this.tabs.forEach(tab => {
      if (tab.path === event.dragNode?.data?.previousPath) {
        tab.path = event.dragNode?.data?.path
      }
    })
  }

  private handleDelete(event: any) {
    this.files = event.files
    //TODO hightlight it with red color when these files are open
    // TODO check also if this file is included in a folder that has been deleted
    this.tabs.forEach(tab => {
      if (tab.path == event.deletedNode?.data?.path) {
        tab.fileDeleted = true
      }
    })
  }

  tabClose(event: any) {
    this.tabs.splice(event.index, 1)
  }
}

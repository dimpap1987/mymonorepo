import { Component, Input, OnInit } from '@angular/core'

export interface SnippetCardState {
  imageSrc?: string
  title?: string
  labels?: string[]
  content?: {
    type?: 'image' | 'txt'
    data?: string
  }
  isPublic?: boolean
  footer?: string
}

@Component({
  selector: 'dp-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrls: ['./snippet-card.component.scss'],
})
export class SnippetCardComponent implements OnInit {
  @Input() state: SnippetCardState

  constructor() {}

  ngOnInit(): void {}
}

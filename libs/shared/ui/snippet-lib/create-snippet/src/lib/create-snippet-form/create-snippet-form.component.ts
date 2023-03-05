import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'dp-create-snippet-form',
  templateUrl: './create-snippet-form.component.html',
  styleUrls: ['./create-snippet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSnippetFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

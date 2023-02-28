import { Component, OnInit } from '@angular/core'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'

@Component({
  selector: 'dp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public get getLang(): typeof ProgrammingLanguage {
    return ProgrammingLanguage
  }
}

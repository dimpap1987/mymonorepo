import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateSnippetFormComponent } from './create-snippet-form.component'

describe('CreateSnippetFormComponent', () => {
  let component: CreateSnippetFormComponent
  let fixture: ComponentFixture<CreateSnippetFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSnippetFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CreateSnippetFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

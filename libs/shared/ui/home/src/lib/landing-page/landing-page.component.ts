import { Component, OnInit } from '@angular/core'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'

@Component({
  selector: 'dp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  pythonSnippet = `# Statically defined list
  my_list = [2, 5, 6]
  # Appending using slice assignment
  my_list[len(my_list):] = [5]  # [2, 5, 6, 5]
  # Appending using append()
  my_list.append(9)  # [2, 5, 6, 5, 9]
  # Appending using extend()
  my_list.extend([-4])  # [2, 5, 6, 5, 9, -4]
  # Appending using insert()
  my_list.insert(len(my_list), 3)  # [2, 5, 6, 5, 9, -4, 3]`

  javascriptSnippet = `fetch('https://example.com/authenticate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'David', password: '12345' })
}).then(response => response.json()).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});`

  javaSnippet = `int i = 0;
do {
  System.out.println(i);
  i++;
}
while (i < 5);`

  htmlSnippet = ` <input type="text" value="User input Text to copy" #userinput>
<button (click)="copyInputMessage(userinput)" value="click to copy" >Copy from Textbox</button>`
  cssSnippet = `:host {
  display: block;
  height: 100vh;
}`

  ngOnInit(): void {}

  public get getLang(): typeof ProgrammingLanguage {
    return ProgrammingLanguage
  }
}

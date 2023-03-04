import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'

@Component({
  selector: 'dp-snippets-list',
  templateUrl: './snippets-list.component.html',
  styleUrls: ['./snippets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetsListComponent implements OnInit {
  constructor() {}

  pythonSnippet = `yusuke_power = {"Yusuke Urameshi": "Spirit Gun"}
  hiei_power = {"Hiei": "Jagan Eye"}
  powers = dict()
  
  # Brute force
  for dictionary in (yusuke_power, hiei_power):
      for key, value in dictionary.items():
          powers[key] = value
  
  # Dictionary Comprehension
  powers = {key: value for d in (yusuke_power, hiei_power) for key, value in d.items()}
  
  # Copy and update
  powers = yusuke_power.copy()
  powers.update(hiei_power)
  
  # Dictionary unpacking (Python 3.5+)
  powers = {**yusuke_power, **hiei_power}
  
  # Backwards compatible function for any number of dicts
  def merge_dicts(*dicts: dict):
      merged_dict = dict()
      for dictionary in dicts:
          merge_dict.update(dictionary)
      return merged_dict
  
  # Dictionary union operator (Python 3.9+ maybe?)
  powers = yusuke_power | hiei_power`

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

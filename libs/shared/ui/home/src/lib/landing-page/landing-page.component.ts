import { Component } from '@angular/core'

@Component({
  selector: 'dp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor() {}

  items = [
    {
      label: 'Snippet',
      // icon: 'pi pi-code',
      items: [
        // {
        //   label: 'New',
        //   icon: 'pi pi-fw pi-plus',
        //   routerLink: ConstantsClient.endpoints().ui.snippets.create,
        // },
        {
          label: 'Recently Added',
          icon: 'pi pi-code',
          routerLink: 'snippets/recent',
        },
      ],
    },
  ]
}

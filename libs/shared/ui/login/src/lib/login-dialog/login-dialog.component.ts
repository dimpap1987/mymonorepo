import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core'

@Component({
  selector: 'dp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent implements OnInit {
  loading: boolean

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loading = false
  }

  @HostListener('document:visibilitychange', ['$event'])
  handleVisibilityChange(event: any): void {
    this.loading = false
    this.cdr.detectChanges()
  }

  onClick() {
    this.loading = true
    setTimeout(() => {
      console.error('There was a problem. Please try again later...')
      this.loading = false
      this.cdr.detectChanges()
    }, 5000)
  }
}

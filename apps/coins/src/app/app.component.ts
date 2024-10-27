import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '@angular-nx-firebase-monorepo/utils/ui';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'angular-nx-firebase-monorepo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'coins';
}

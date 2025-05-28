import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LayoutService } from '../../services/layout.service';
import { THEME } from '../../models/theme';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ThemeToggleComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  private readonly layoutService = inject(LayoutService);

  public onToggleTheme(theme: THEME) {
    this.layoutService.setTheme(theme);
  }
}

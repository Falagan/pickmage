import { Component, Output, signal, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { THEME } from '../../models/theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  standalone: true,
})
export class ThemeToggleComponent {
  @Output() change = new EventEmitter<THEME>();
  theme = signal(THEME.LIGHT);

  toggleTheme() {
    this.theme.update(this.nextTheme);
    this.change.emit(this.theme());
  }

  private nextTheme = (theme: THEME) =>
    this.theme() === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
}

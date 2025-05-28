import { Injectable, signal } from '@angular/core';
import { THEME } from '../models/theme';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public setTheme(theme: THEME): void {
    document.body.classList.toggle('dark-theme', theme === THEME.DARK);
  }
}

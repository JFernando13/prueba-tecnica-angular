import { afterRender, Injectable, signal } from '@angular/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private keyTheme = 'theme';
  currentTheme = signal<Theme | undefined>(undefined);

  constructor() {
    afterRender(() => {
      this.currentTheme.set(localStorage.getItem(this.keyTheme) as Theme);

      if (this.currentTheme() === Theme.LIGHT) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    });
  }

  private setLightTheme() {
    if (this.currentTheme() !== undefined) {
      this.currentTheme.set(Theme.LIGHT);
      localStorage.setItem(this.keyTheme, this.currentTheme() ?? '');
      document.documentElement.classList.remove('dark');
    }
  }

  private setDarkTheme() {
    if (this.currentTheme() !== undefined) {
      this.currentTheme.set(Theme.DARK);
      localStorage.setItem(this.keyTheme, this.currentTheme() ?? '');
      document.documentElement.classList.add('dark');
    }
  }

  setTheme() {
    if (this.currentTheme() === Theme.LIGHT) {
      this.setDarkTheme();
    } else this.setLightTheme();
  }
}

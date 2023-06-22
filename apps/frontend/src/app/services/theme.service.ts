import { Injectable } from '@angular/core';
import { LightTheme, Theme } from '../core/types/Themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public active: Theme = LightTheme;
  changeActiveTheme(theme: Theme): void {
    localStorage.setItem('theme', theme.name);
    this.active = theme;
    document.getElementById("meta-theme")?.setAttribute('content', this.active.properties['--pwa-bg-color']);
    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(property, this.active.properties[property]);
    });
  }

  getClassForColors(value: number): string {
    if (value < 10000) return 'gradient-red-numbers';
    else if (value > 10000 && value < 100000) return 'gradient-yellow-numbers';
    else return 'gradient-green-numbers';
  }
}

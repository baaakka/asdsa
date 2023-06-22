import { Pipe, PipeTransform } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Pipe({ name: 'followersCount' })
export class FollowersCountPipe implements PipeTransform {
  constructor(private themeService: ThemeService) {}

  getNumber(value: number): string {
    if (value < 1000) return `${value}`;
    else if (value >= 1000 && value < 1000000) return `${(value / 1000).toFixed(0)}k`.replace(',', '.');
    else return `${(value / 1000000).toFixed(1)}m`.replace(',', '.');
  }
  transform(value: number): string {
    return `<span class='${this.themeService.getClassForColors(value)}'>${this.getNumber(value)}</span>`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cakeTitlecase'
})
export class CakeTitlePipe implements PipeTransform {

  transform(value: string): string {
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

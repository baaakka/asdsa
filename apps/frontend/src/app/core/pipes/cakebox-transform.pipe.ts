import { Pipe, PipeTransform } from '@angular/core';
import { RewardItem } from '@cake/lib-api-interface';
import { CakeBox } from '../types/cakebox.interface';
import { MapperService } from '../../services/mapper.service';

@Pipe({name: 'cakeboxTransform'})
export class CakeboxTransformPipe implements PipeTransform {
    constructor(private mapperService: MapperService){}
  transform(value: RewardItem): CakeBox {
    return this.mapperService.cakeboxMapper(value);
  }
}
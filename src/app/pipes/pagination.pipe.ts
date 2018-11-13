import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  pure: false
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], maxRows: number, page: number ): any[] {
    if(value.length === 0) return value;
    const index = maxRows * page;
    return [...value].slice( index - maxRows, index);
  }
}

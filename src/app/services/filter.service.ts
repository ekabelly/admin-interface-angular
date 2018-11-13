import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  transform(value: any[], filterStr: string, propName: string): any[] {
    if(value.length === 0 || filterStr === '') return value;
    return [...value].filter((item, i)=>{
       if(typeof item[propName] === 'number') item[propName] += '';
      return item[propName].toLowerCase().indexOf(filterStr.toLowerCase()) !== -1;
    });
  }
}

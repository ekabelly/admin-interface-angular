import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { NameNumPair } from '../models/namenumpair';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data;
  tags: NameNumPair[] = [
    { name: 'דברי רוסית', value: 12},
    { name: 'רכב', value: 111},
    { name: 'כח פיזי', value: 112},
    { name: 'רכב גדול', value: 323}
  ];

  constructor(private http: HttpClient) { }

  fetchComments(){
    return this.http.get('https://jsonplaceholder.typicode.com/comments')
    .map((data) => {
      // console.log(data, 'comments');
      return data;
    });
  }

  fetchComment(id: number){
    return this.http.get('https://jsonplaceholder.typicode.com/comments/'+id)
    .map((data: any) => {
      // console.log(data, 'comment');
      return {
        volunteersTypes: {
          active: true,
          supports: false,
          activePlus: false
        },
        volunteersNum:{
          min: 1,
          max: 30
        },
        eventTitle:  data.email,
        eventDesc:  data.name,
        personalType: 'open',
        time: {
          date :new Date('12/12/12'),
          duration:'oneTime',
          time:'12:00'
        },
        urgent: true,
        tags:[111]
      };
    });
  }

  fetchTags() : Promise<any[]> {
    return new Promise((resolve, reject)=> {
        resolve(this.tags);
    });
  }

  addTag(tag: string) : Promise<any[]> {
    this.tags.push({name: tag, value: this.tags[this.tags.length - 1].value + 1});
    return new Promise((resolve, reject)=> {
        resolve(this.tags);
    });
  }
}

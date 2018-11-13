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
    .map((data) => {
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
        eventTitle:  'test',
        eventDesc:  'test desc',
        personalType: 'open',
        time: {
          date :new Date('12/12/12'),
          duration:'oneTime',
          time:'12:00'
        },
        urgent: true
      };
    });
  }

  fetchTags() : Promise<NameNumPair[]> {
    return new Promise((resolve, reject)=> {
        resolve([
          { name: 'דברי רוסית', value: 323}
        ]);
    });
  }
}

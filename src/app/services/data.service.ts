import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  'rxjs/Rx';
import { Tag } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // data;
  tags: Tag[] = [];

  constructor(private http: HttpClient) { }

  fetchConfig(){
    return this.http.get('https://admin-interface-dev.firebaseio.com/config.json');
  }

  fetchEvents(){
    return this.http.get('https://admin-interface-dev.firebaseio.com/events.json');
  }

  fetchEvent(id){
    return this.http.get('https://admin-interface-dev.firebaseio.com/events/'+ id + '.json'); 
  }

  fetchTags(){
    return this.http.get('https://admin-interface-dev.firebaseio.com/config/tags.json');
  }

  addTag(tag: string) : Promise<Tag[]> {
    //push the new tag, then fetch all the tags and return them with a promise.
    return new Promise((resolve, reject)=> {
      this.http.post('https://admin-interface-dev.firebaseio.com/config/tags.json', { name: "", translation: tag}).subscribe(()=>
          this.fetchTags().subscribe((data: Tag[])=>resolve(data)));
    })
  }

  pushEvent(event){
    return this.http.post('https://admin-interface-dev.firebaseio.com/events.json', event);
  }
}

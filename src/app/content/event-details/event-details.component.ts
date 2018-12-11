import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event = {};
  id: number;
  isEvent: boolean = false;
  mode: string = "";

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.mode = window.location.pathname.split('/')[3];

      if(params['id'] != 0 && Number(params['id']) !== null){
        this.dataService.fetchEvent(params['id']).subscribe((data) =>{
          this.isEvent = true;
          this.event = data;
        });

      }else{ this.isEvent = false;}
    });
  }

}

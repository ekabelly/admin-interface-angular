import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  data;
  filteredData;
  isData: boolean = false;
  currentPage: number = 1;
  maxRows: number = 10;

  constructor(private dataService: DataService, private filterService: FilterService) { }

  ngOnInit() {
    this.dataService.fetchComments().subscribe(
      (data) =>{
        this.filteredData = data; 
        this.data = data; 
        this.isData = true;
      });
  }

  changePage(e){
    if(e.location === 'events'){
      this.currentPage = e.page;
    }
  }

  filter(filterStr, propName){
    this.filteredData = this.filterService.transform(this.filteredData, filterStr, propName);
  }
 
}

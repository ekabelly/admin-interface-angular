import { Component, OnInit, Input, EventEmitter, Output, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges, DoCheck {
  @Output() changePage = new EventEmitter<{location: string, page: number}>();
  @Input() data: any[];
  @Input() location: string;
  @Input() maxRows: number;
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  lastPage: number;

  constructor() { }

  ngOnInit() {
    this.lastPage = Math.ceil(this.data.length / this.maxRows);
  }

  ngDoCheck(){
    this.changeLastPage();
  }

  ngOnChanges(){
    //this.changeLastPage()
  }

  changeLastPage(){
    this.lastPage = Math.ceil(this.data.length / this.maxRows);
    if(this.lastPage < this.currentPage){
      this.jumpToPage(this.lastPage);
    }
  }

  jumpToPage(page){
    if(page > this.lastPage || page < 1) return;

    this.currentPage = page;
    this.changePage.emit({location: this.location , page});
    this.changePagesDisplay()
  }

  changePagesDisplay(){
    
    if(this.currentPage == this.lastPage && this.currentPage > 4){
      this.pages = [this.currentPage - 4, this.currentPage - 3, this.currentPage - 2, this.currentPage - 1, this.currentPage];
    }
    else if(this.currentPage == this.lastPage && this.currentPage > 3){
      this.pages = [this.currentPage - 3, this.currentPage - 2, this.currentPage - 1, this.currentPage];
    }
    else if(this.currentPage == this.lastPage - 1 && this.currentPage > 3) {
      this.pages = [this.currentPage - 3, this.currentPage - 2, this.currentPage - 1, this.currentPage , this.currentPage + 1];
    }
    else if(this.currentPage == 1) {
      this.pages = [this.currentPage, this.currentPage + 1, this.currentPage + 2, this.currentPage +3, this.currentPage + 4];
    }
    else if(this.currentPage == 2) {
      this.pages = [this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2 , this.currentPage + 3];
    }
    // else if(this.lastPage <= this.maxRows){
    //   this.pages = [this.currentPage];
    // }
    else{
      this.pages = [this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2];
    }
  }
}

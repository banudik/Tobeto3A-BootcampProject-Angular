import { Component, OnInit } from '@angular/core';
import { BootcampStateListItemDto } from '../../../../../features/models/responses/bootcamp-state/bootcampstate-list-item-dto';
import { PageRequest } from '../../../../../core/models/page-request';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bootcampstateindex',
  standalone: true,
  imports: [CommonModule,RouterModule,CommonModule],
  templateUrl: './bootcampstateindex.component.html',
  styleUrl: './bootcampstateindex.component.css'
})
export class BootcampstateindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  constructor(private bootcampStateService:BootcampStateService) {}

  bootcampStateList: BootcampStateListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredBootcampStateList: BootcampStateListItemDto = this.bootcampStateList;


  ngOnInit(): void {
    this.getList({ page: 0, pageSize: this.PAGE_SIZE }) 
    //console.log("start " + this.bootcampStateList.items.length);
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.bootcampStateService.getList(pageRequest).subscribe((response) => {
      this.bootcampStateList = response;
    })
  }

  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredBootcampStateList.items.length == 0 && this.searchTermTmp == ''){
      return this.bootcampStateList.items.slice(startIndex,endIndex);
    }
    return this.filteredBootcampStateList.items.slice(startIndex,endIndex);
  }

  nextPage(){
    this.currentPageNumber++;
    this.visibleData();

  }

  previousPage(){
    this.currentPageNumber--;
    this.visibleData();
  }

  pageNumbers(){
    let totalPages:number;

    if(this.filteredBootcampStateList.items.length == 0 && this.searchTermTmp == ''){
      totalPages = Math.ceil(this.bootcampStateList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredBootcampStateList.items.length / this.pageSize);
    }
    
    let pageNumArray = new Array(totalPages);
    return pageNumArray;
  }

  changePage(pageNumber:number){
    this.currentPageNumber = pageNumber;
    this.visibleData();
  }

  changePageSize(pageSize:any){
    this.pageSize = pageSize;
    this.visibleData();
  }


  filterData(searchTerm: string) {
    this.searchTermTmp = searchTerm;
    this.filteredBootcampStateList.items = this.bootcampStateList.items.filter((item) => {
      return Object.values(item).some((val) => {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    this.visibleData();
  }
}

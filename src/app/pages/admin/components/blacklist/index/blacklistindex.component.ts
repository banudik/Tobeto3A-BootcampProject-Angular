import { Component, OnInit } from '@angular/core';
import { BlacklistService } from '../../../../../features/services/concretes/blacklist.service';
import { BlacklistListItemDto } from '../../../../../features/models/responses/blacklist/blacklist-list-item-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageRequest } from '../../../../../core/models/page-request';

@Component({
  selector: 'app-blacklistindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './blacklistindex.component.html',
  styleUrl: './blacklistindex.component.css'
})
export class BlacklistindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  isLoading: boolean = false;
  constructor(private blacklistService:BlacklistService) {}

  blacklistList: BlacklistListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredBlacklistList: BlacklistListItemDto = this.blacklistList;

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) 
    //console.log("start " + this.bootcampStateList.items.length);
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.blacklistService.getList(pageRequest).subscribe((response) => {
      this.blacklistList = response;
      this.isLoading = false;
    })
  }



  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredBlacklistList.items.length == 0 && this.searchTermTmp == ''){
      return this.blacklistList.items.slice(startIndex,endIndex);
    }
    return this.filteredBlacklistList.items.slice(startIndex,endIndex);
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

    if(this.filteredBlacklistList.items.length == 0 && this.searchTermTmp == ''){
      totalPages = Math.ceil(this.blacklistList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredBlacklistList.items.length / this.pageSize);
    }
    
    let pageNumArray = new Array(totalPages);
    return pageNumArray;
  }

  changePage(pageNumber:number){
    this.currentPageNumber = pageNumber;
    this.visibleData();
  }

  changePageSize(pageSize:string){
    this.pageSize = parseInt(pageSize, 10);
    this.visibleData();
  }


  filterData(searchTerm: string) {
    this.searchTermTmp = searchTerm;
    this.filteredBlacklistList.items = this.blacklistList.items.filter((item) => {
      return Object.values(item).some((val) => {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    this.visibleData();
  }
}

import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../../../features/services/concretes/announcement.service';
import { AnnouncementListItemDto } from '../../../../../features/models/responses/announcement/announcement-list-item-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageRequest } from '../../../../../core/models/page-request';

@Component({
  selector: 'app-announcementindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './announcementindex.component.html',
  styleUrl: './announcementindex.component.css'
})
export class AnnouncementindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  isLoading: boolean = false;
  constructor(private announcementService:AnnouncementService) {}

  announcementList: AnnouncementListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredAnnouncementList: AnnouncementListItemDto = this.announcementList;

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) 
    //console.log("start " + this.bootcampStateList.items.length);
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.announcementService.getList(pageRequest).subscribe((response) => {
      this.announcementList = response;
      this.isLoading = false;
    })
  }



  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredAnnouncementList.items.length == 0 && this.searchTermTmp == ''){
      return this.announcementList.items.slice(startIndex,endIndex);
    }
    return this.filteredAnnouncementList.items.slice(startIndex,endIndex);
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

    if(this.filteredAnnouncementList.items.length == 0 && this.searchTermTmp == ''){
      totalPages = Math.ceil(this.announcementList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredAnnouncementList.items.length / this.pageSize);
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
    this.filteredAnnouncementList.items = this.announcementList.items.filter((item) => {
      return Object.values(item).some((val) => {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    this.visibleData();
  }
}

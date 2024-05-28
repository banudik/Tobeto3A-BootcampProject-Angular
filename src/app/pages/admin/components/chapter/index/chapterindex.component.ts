import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { ChapterListItemDto } from '../../../../../features/models/responses/chapter/chapter-list-item-dto';
import { PageRequest } from '../../../../../core/models/page-request';
import { ChapterService } from '../../../../../features/services/concretes/chapter.service';
import { GetListBootcampResponse } from '../../../../../features/models/responses/bootcamp/get-list-bootcamp-response';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chapterindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './chapterindex.component.html',
  styleUrl: './chapterindex.component.css'
})
export class ChapterindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  isLoading: boolean = false;
  bootcampFilterTmp:string = '';
  constructor(private chapterService:ChapterService,private bootcampService:BootcampService) {}

  chapterList: ChapterListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredChapterList: ChapterListItemDto = this.chapterList;
  bootcamps!:GetListBootcampResponse[];
  ngOnInit(): void {
    this.getBootcamps();
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) ;
    //console.log("start " + this.bootcampStateList.items.length);
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.chapterService.getList(pageRequest).subscribe((response) => {
      this.chapterList = response;
      this.isLoading = false;
    })
  }

  getBootcamps(){
    this.isLoading = true;
    this.bootcampService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe((response)=>{
     this.bootcamps=response.items;
     this.isLoading = false;
    })
 }



 visibleData(){
  let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
  let endIndex = startIndex + this.pageSize;
  
  if(this.filteredChapterList.items.length == 0 && this.searchTermTmp == '' && this.bootcampFilterTmp == ''){
    return this.chapterList.items.slice(startIndex,endIndex);
  }
  return this.filteredChapterList.items.slice(startIndex,endIndex);
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

  if(this.filteredChapterList.items.length == 0 && this.searchTermTmp == '' && this.bootcampFilterTmp == ''){
    totalPages = Math.ceil(this.chapterList.items.length / this.pageSize);
  }
  else{
    totalPages = Math.ceil(this.filteredChapterList.items.length / this.pageSize);
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
    
    if (this.bootcampFilterTmp !== '') {
      this.filteredChapterList.items = this.chapterList.items.filter((item) => {
        return item.bootcampName === this.bootcampFilterTmp && Object.values(item).some((val) => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    } else {
      this.filteredChapterList.items = this.chapterList.items.filter((item) => {
        return Object.values(item).some((val) => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }
  
    this.visibleData();
  }

  filterByBootcamp(bootcampName: string) {
    this.bootcampFilterTmp = bootcampName;
  
    if (bootcampName === '') {
      this.filteredChapterList.items = this.chapterList.items;
    } else {
      this.filteredChapterList.items = this.chapterList.items.filter((item) => {
        return item.bootcampName === bootcampName;
      });
    }
  
    this.visibleData();
  }
}
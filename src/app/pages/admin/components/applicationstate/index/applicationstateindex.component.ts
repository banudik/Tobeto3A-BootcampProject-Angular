import { Component, OnInit } from '@angular/core';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { ApplicationStateInformationListItemDto } from '../../../../../features/models/responses/application-state-information/application-state-information-list-item-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageRequest } from '../../../../../core/models/page-request';

@Component({
  selector: 'app-applicationstateindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './applicationstateindex.component.html',
  styleUrl: './applicationstateindex.component.css'
})
export class ApplicationstateindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  constructor(private applicationStateService:ApplicationStateInformationService) {}

  applicationStateList: ApplicationStateInformationListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredApplicationStateList: ApplicationStateInformationListItemDto = this.applicationStateList;


  ngOnInit(): void {
    this.getList({ page: 0, pageSize: this.PAGE_SIZE }) 
    //console.log("start " + this.bootcampStateList.items.length);
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.applicationStateService.getList(pageRequest).subscribe((response) => {
      this.applicationStateList = response;
    })
  }

  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredApplicationStateList.items.length == 0 && this.searchTermTmp == ''){
      return this.applicationStateList.items.slice(startIndex,endIndex);
    }
    return this.filteredApplicationStateList.items.slice(startIndex,endIndex);
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

    if(this.filteredApplicationStateList.items.length == 0 && this.searchTermTmp == ''){
      totalPages = Math.ceil(this.applicationStateList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredApplicationStateList.items.length / this.pageSize);
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
    this.filteredApplicationStateList.items = this.applicationStateList.items.filter((item) => {
      return Object.values(item).some((val) => {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    this.visibleData();
  }
}

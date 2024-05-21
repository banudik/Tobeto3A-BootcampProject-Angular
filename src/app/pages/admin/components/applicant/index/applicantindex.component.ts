import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageRequest } from '../../../../../core/models/page-request';
import { ApplicantListItemDto } from '../../../../../features/models/responses/applicant/applicant-list-item-dto';
import { ApplicantService } from '../../../../../features/services/concretes/applicant.service';
import { BlacklistListItemDto } from '../../../../../features/models/responses/blacklist/blacklist-list-item-dto';
import { BlacklistService } from '../../../../../features/services/concretes/blacklist.service';

@Component({
  selector: 'app-applicantindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './applicantindex.component.html',
  styleUrl: './applicantindex.component.css'
})
export class ApplicantindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  isLoading: boolean = false;
  constructor(private applicantService:ApplicantService,private blacklistService:BlacklistService) {}

  applicantList: ApplicantListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredApplicantList: ApplicantListItemDto = this.applicantList;
  blackList!:BlacklistListItemDto;

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) 
    this.getBlackList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) 
    //console.log("start " + this.bootcampStateList.items.length);
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.applicantService.getList(pageRequest).subscribe((response) => {
      this.applicantList = response;
      this.isLoading = false;
    })
  }

  getBlackList(pageRequest: PageRequest): void {
    this.isLoading = true;
    this.blacklistService.getList(pageRequest).subscribe((response) => {
      this.blackList = response;
      this.isLoading = false;
    });
  }

  isBlackListed(state: string): boolean {
    this.isLoading = true;
    if(this.blackList.items.find(item => item.applicantId === state)){
      this.isLoading = false;
      return true;
    }
    this.isLoading = false;
    return false; 
    //return this.blackList.items.find(item => item.applicantId === state.id) !== undefined;
  }


  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredApplicantList.items.length == 0 && this.searchTermTmp == ''){
      return this.applicantList.items.slice(startIndex,endIndex);
    }
    return this.filteredApplicantList.items.slice(startIndex,endIndex);
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

    if(this.filteredApplicantList.items.length == 0 && this.searchTermTmp == ''){
      totalPages = Math.ceil(this.applicantList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredApplicantList.items.length / this.pageSize);
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
    this.filteredApplicantList.items = this.applicantList.items.filter((item) => {
      return Object.values(item).some((val) => {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    this.visibleData();
  }
}

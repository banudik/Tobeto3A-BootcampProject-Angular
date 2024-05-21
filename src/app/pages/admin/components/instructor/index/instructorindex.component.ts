import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { InstructorListItemDto } from '../../../../../features/models/responses/instructor/instructor-list-item-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageRequest } from '../../../../../core/models/page-request';

@Component({
  selector: 'app-instructorindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './instructorindex.component.html',
  styleUrl: './instructorindex.component.css'
})
export class InstructorindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  isLoading: boolean = false;
  constructor(private instructorService:InstructorService) {}

  instructorList: InstructorListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredInstructorList: InstructorListItemDto = this.instructorList;

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) 
    //console.log("start " + this.bootcampStateList.items.length);
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.instructorService.getList(pageRequest).subscribe((response) => {
      this.instructorList = response;
      this.isLoading = false;
    })
  }



  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredInstructorList.items.length == 0 && this.searchTermTmp == ''){
      return this.instructorList.items.slice(startIndex,endIndex);
    }
    return this.filteredInstructorList.items.slice(startIndex,endIndex);
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

    if(this.filteredInstructorList.items.length == 0 && this.searchTermTmp == ''){
      totalPages = Math.ceil(this.instructorList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredInstructorList.items.length / this.pageSize);
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
    this.filteredInstructorList.items = this.instructorList.items.filter((item) => {
      return Object.values(item).some((val) => {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    this.visibleData();
  }
}
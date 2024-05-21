import { Component, OnInit } from '@angular/core';
import { BootcampListItemDto } from '../../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../../../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { InstructorListItemDto } from '../../../../../features/models/responses/instructor/instructor-list-item-dto';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
@Component({
  selector: 'app-bootcampindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bootcampindex.component.html',
  styleUrl: './bootcampindex.component.css'
})
export class BootcampindexComponent implements OnInit{
  dateNow = Date.now;
  
  bootcampList: BootcampListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  instructors!:InstructorListItemDto;
  
  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute,private instructorService:InstructorService,private authService:AuthService) {}
  readonly PAGE_SIZE = 100000; //for api

  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  instructorFilterTmp:string = '';
  filteredBootcampList: BootcampListItemDto = this.bootcampList;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getInstructors();
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE })
    this.visibleData();
    this.pageNumbers();
  }

  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    if(this.authService.isInstructor()){
      let instructorId = this.authService.getCurrentUserId();
      this.bootcampService.getBootcampListByInstructorId(pageRequest,instructorId).subscribe((response) => {
        this.bootcampList = response;
        this.isLoading = false;
      })
    }
    else{
      this.bootcampService.getList(pageRequest).subscribe((response) => {
        this.bootcampList = response;
        this.isLoading = false;
      })
    }

  }

  getInstructors(){
    this.isLoading = true;
    this.instructorService.GetListAll().subscribe((response)=>{
     this.instructors=response;
     this.isLoading = false;
    })
 }

  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredBootcampList.items.length == 0 && this.searchTermTmp == '' && this.instructorFilterTmp == ''){
      return this.bootcampList.items.slice(startIndex,endIndex);
    }
    return this.filteredBootcampList.items.slice(startIndex,endIndex);
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

    if(this.filteredBootcampList.items.length == 0 && this.searchTermTmp == '' && this.instructorFilterTmp == ''){
      totalPages = Math.ceil(this.bootcampList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredBootcampList.items.length / this.pageSize);
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
    this.currentPageNumber = 1;
    this.visibleData();
  }


  filterData(searchTerm: string) {
    this.searchTermTmp = searchTerm;
    
    if (this.instructorFilterTmp !== '') {
      this.filteredBootcampList.items = this.bootcampList.items.filter((item) => {
        return item.instructorId === this.instructorFilterTmp && Object.values(item).some((val) => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    } else {
      this.filteredBootcampList.items = this.bootcampList.items.filter((item) => {
        return Object.values(item).some((val) => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }
  
    this.visibleData();
  }

  filterByInstructor(instructorId: string) {
    this.instructorFilterTmp = instructorId;
  
    if (instructorId === '') {
      this.filteredBootcampList.items = this.bootcampList.items;
    } else {
      this.filteredBootcampList.items = this.bootcampList.items.filter((item) => {
        return item.instructorId === instructorId;
      });
    }
  
    this.visibleData();
  }

}

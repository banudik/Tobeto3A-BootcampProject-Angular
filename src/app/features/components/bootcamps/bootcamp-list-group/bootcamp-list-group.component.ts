import { Component, OnInit } from '@angular/core';
import { BootcampListItemDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InstructorComponent } from "../../instructor/instructor.component";
import { FormsModule } from '@angular/forms';
import { InstructorService } from '../../../services/concretes/instructor.service';
import { InstructorListItemDto } from '../../../models/responses/instructor/instructor-list-item-dto';
import { AuthService } from '../../../services/concretes/auth.service';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  templateUrl: './bootcamp-list-group.component.html',
  styleUrl: './bootcamp-list-group.component.css',
  imports: [CommonModule, HttpClientModule, InstructorComponent, RouterModule, FormsModule]
})
export class BootcampListGroupComponent implements OnInit {

  dateNow = Date.now();
  currentPageNumber!: number;
  pageSizes: Array<number> = [3,6, 9, 12];
  PAGE_SIZE: number = 3;
  instructors!: InstructorListItemDto;
  instructorFilterTmp: string = '';
  searchFilterTmp: string = '';
  isLoading: boolean = false;
  pageRequestTmp:PageRequest ={
    pageIndex:0,
    pageSize:this.PAGE_SIZE
  };
  bootcampList: BootcampListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredBootcampList: BootcampListItemDto = this.bootcampList;

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private instructorService: InstructorService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.getInstructors();
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }

  getInstructors() {
    this.isLoading = true;
    this.instructorService.GetListAll().subscribe((response) => {
      this.instructors = response;
      this.isLoading = false;
    });
  }

  isExpired(endDate: Date): boolean {
    return new Date(endDate) < new Date(); // endDate, geçmiş bir tarihe sahipse true döndürür
  }

  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;
      this.isLoading = false;
      this.updateCurrentPageNumber();
    });
  }

  getBootcampListByInstructor(pageRequest: PageRequest, instructorId: string) {
    this.isLoading = true;
    this.bootcampService.getBootcampListByInstructorId(pageRequest, instructorId).subscribe((response) => {
      this.bootcampList = response;
      this.isLoading = false;
      this.updateCurrentPageNumber();
    });
  }

  pageNumbers(){
    let pageNumbers = new Array(this.bootcampList.pages);
    return pageNumbers;
  }

  changePage(pageNumber:number){
    this.currentPageNumber = pageNumber;
    
    this.applyFilters({pageIndex: this.currentPageNumber, pageSize:this.PAGE_SIZE});
  }

  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    this.updateCurrentPageNumber();
    this.applyFilters({ pageIndex: nextPageIndex, pageSize: this.PAGE_SIZE });
    // this.activatedRoute.params.subscribe(params => {
    //   if (params['instructorId']) {
    //     this.getBootcampListByInstructor({ page: nextPageIndex, pageSize: pageSize }, params['instructorId']);
    //   } else {
    //     this.getList({ page: nextPageIndex, pageSize: pageSize });
    //   }
    // });

    
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    this.lowerCurrentPageNumber();
    this.applyFilters({ pageIndex: previousPageIndex, pageSize: this.PAGE_SIZE });
    // this.activatedRoute.params.subscribe(params => {
    //   if (params['instructorId']) {
    //     this.getBootcampListByInstructor({ page: previousPageIndex, pageSize: pageSize }, params['instructorId']);
    //   } else {
    //     this.getList({ page: previousPageIndex, pageSize: pageSize });
    //   }
    // });

    
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }

  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index - 1;
  }

  filterData(search: string) {
    this.searchFilterTmp = search;
    this.applyFilters();
  }

  filterByInstructor(instructorId: string) {
    this.instructorFilterTmp = instructorId;
    this.applyFilters();
  }

  changePageSize(pageSize: any) {
    this.PAGE_SIZE = pageSize;
    this.applyFilters();
  }

  applyFilters(pageRequestParameter?:PageRequest) {
    if(pageRequestParameter == null){
      this.pageRequestTmp = { pageIndex: 0, pageSize: this.PAGE_SIZE };
    }
    else{
      this.pageRequestTmp = pageRequestParameter;
    }
    this.isLoading = true;
    if (this.instructorFilterTmp && this.searchFilterTmp) {
      console.log("1");
      
      this.bootcampService.getListByBootcampNameSearch(this.pageRequestTmp, this.searchFilterTmp,this.instructorFilterTmp).subscribe((response) => {
        this.filteredBootcampList = response;
        this.filteredBootcampList.items = this.filteredBootcampList.items.filter(item => item.instructorId === this.instructorFilterTmp);
        this.bootcampList = this.filteredBootcampList;
        this.updateCurrentPageNumber();
      });
    } else if (this.instructorFilterTmp) {
      console.log("2");
      this.getBootcampListByInstructor(this.pageRequestTmp, this.instructorFilterTmp);
    } else if (this.searchFilterTmp) {
      this.bootcampService.getListByBootcampNameSearch(this.pageRequestTmp, this.searchFilterTmp,this.instructorFilterTmp).subscribe((response) => {
        this.bootcampList = response;
        this.updateCurrentPageNumber();
      });
    } else {
      this.getList(this.pageRequestTmp);
    }
    this.isLoading = false;
  }

  visibleData() {
    return this.bootcampList.items;
  }
}


import { Component, OnInit } from '@angular/core';
import { BootcampListItemDto } from '../../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../../../../core/models/page-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootcampindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bootcampindex.component.html',
  styleUrl: './bootcampindex.component.css'
})
export class BootcampindexComponent implements OnInit{
  dateNow = Date.now;
  currentPageNumber!: number;
  
  bootcampList: BootcampListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  
  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute) {}
  readonly PAGE_SIZE = 10;

  ngOnInit(): void {
    this.getList({ page: 0, pageSize: this.PAGE_SIZE })
  }

  getList(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;
      this.updateCurrentPageNumber();
    })

  }

  getBootcampListByInstructor(pageRequest: PageRequest, instructorId: string) {
    this.bootcampService.getBootcampListByInstructorId(pageRequest, instructorId).subscribe((response) => {
      this.bootcampList = response;
      this.updateCurrentPageNumber();
    })
  }

  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    const pageSize = this.bootcampList.size;

    this.getList({ page: nextPageIndex, pageSize: pageSize });
    
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    //this.getList({ page: previousPageIndex, pageSize });

    this.getList({ page: previousPageIndex, pageSize: pageSize });

    this.lowerCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }

  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index - 1;
  }


}

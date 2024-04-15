import { Component, OnInit } from '@angular/core';
import { BootcampListItemDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InstructorComponent } from "../../instructor/instructor.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bootcamp-list-group',
    standalone: true,
    templateUrl: './bootcamp-list-group.component.html',
    styleUrl: './bootcamp-list-group.component.css',
    imports: [CommonModule, HttpClientModule, InstructorComponent,RouterModule,FormsModule]
})
export class BootcampListGroupComponent implements OnInit {
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
  readonly PAGE_SIZE = 8;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ page: 0, pageSize: this.PAGE_SIZE }, params["instructorId"])
      } else { this.getList({ page: 0, pageSize: this.PAGE_SIZE }) }
    })

  }



  isExpired(endDate: Date): boolean {
    return new Date(endDate) < new Date(); // endDate, geçmiş bir tarihe sahipse true döndürür
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
    
    //this.getList({ page: nextPageIndex, pageSize })

    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ page: nextPageIndex, pageSize: pageSize }, params["instructorId"])
      } else { this.getList({ page: nextPageIndex, pageSize: pageSize }) }
    })
    
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    //this.getList({ page: previousPageIndex, pageSize });

    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ page: previousPageIndex, pageSize: pageSize }, params["instructorId"])
      } else { this.getList({ page: previousPageIndex, pageSize: pageSize }) }
    })
    this.lowerCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }

  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index - 1;
  }

}



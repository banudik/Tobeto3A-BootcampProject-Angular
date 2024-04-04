import { Component, NgModule, OnInit } from '@angular/core';
import { BootcampListItemDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
//import { FilterByInstructorPipe } from '../../../../shared/pipes/filter-by-instructor-pipe.pipe';
import { PageRequest } from '../../../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InstructorComponent } from "../../instructor/instructor.component";
import { FilterInstructorPipe } from '../../../../shared/pipes/filter-instructor-pipe.pipe';

@Component({
    selector: 'app-bootcamp-list-group',
    standalone: true,
    templateUrl: './bootcamp-list-group.component.html',
    styleUrl: './bootcamp-list-group.component.css',
    imports: [CommonModule, HttpClientModule, InstructorComponent]
})
export class BootcampListGroupComponent implements OnInit {

  currentPageNumber!: number;
  bootcampList: BootcampListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
    instructorFirstName: '',
    instructorLastName: ''
  };
  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute) { }
  readonly PAGE_SIZE = 6;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ page: 0, pageSize: this.PAGE_SIZE }, params["instructorId"])
      } else { this.getList({ page: 0, pageSize: this.PAGE_SIZE }) }
    })

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

    this.getList({ page: nextPageIndex, pageSize })
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    this.getList({ page: previousPageIndex, pageSize });
    this.updateCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }

}



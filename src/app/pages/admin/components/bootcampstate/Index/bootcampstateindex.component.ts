import { Component, OnInit } from '@angular/core';
import { BootcampStateListItemDto } from '../../../../../features/models/responses/bootcamp-state/bootcampstate-list-item-dto';
import { PageRequest } from '../../../../../core/models/page-request';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bootcampstateindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bootcampstateindex.component.html',
  styleUrl: './bootcampstateindex.component.css'
})
export class BootcampstateindexComponent implements OnInit {
  readonly PAGE_SIZE = 8;
  currentPageNumber!: number;

  /**
   *
   */
  constructor(private bootcampStateService:BootcampStateService) {}

  bootcampStateList: BootcampStateListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  ngOnInit(): void {
    this.getList({ page: 0, pageSize: this.PAGE_SIZE }) 
  }


  getList(pageRequest: PageRequest) {
    this.bootcampStateService.getList(pageRequest).subscribe((response) => {
      this.bootcampStateList = response;
      this.updateCurrentPageNumber();
    })
  }

  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampStateList.index + 1;
    const pageSize = this.bootcampStateList.size;
    
    //this.getList({ page: nextPageIndex, pageSize })


    this.getList({ page: nextPageIndex, pageSize: pageSize }) 
    
    
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampStateList.index - 1;
    const pageSize = this.bootcampStateList.size;
    //this.getList({ page: previousPageIndex, pageSize });

    this.getList({ page: previousPageIndex, pageSize: pageSize }) 
    
    this.lowerCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampStateList.index + 1;
  }

  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampStateList.index - 1;
  }
}

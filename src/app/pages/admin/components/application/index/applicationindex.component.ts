import { Component, OnInit } from '@angular/core';
import { ApplicationInformatinListItemDto } from '../../../../../features/models/responses/application-information/application-information-list-item-dto';
import { ApplicationInformationService } from '../../../../../features/services/concretes/application-information.service';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { ApplicationStateInformationListItemDto } from '../../../../../features/models/responses/application-state-information/application-state-information-list-item-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageRequest } from '../../../../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { GetListApplicationInformationResponse } from '../../../../../features/models/responses/application-information/get-list-application-information-response';
import { GetListApplicationStateInformationResponse } from '../../../../../features/models/responses/application-state-information/get-list-application-state-information-response';

@Component({
  selector: 'app-applicationindex',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applicationindex.component.html',
  styleUrl: './applicationindex.component.css'
})
export class ApplicationindexComponent implements OnInit {
  dateNow = Date.now;
  isLoading: boolean = true;
  applicationList: ApplicationInformatinListItemDto = {
    index: 0,

    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  applicationStates!: GetListApplicationStateInformationResponse[];

  constructor(private applicationService: ApplicationInformationService, private activatedRoute: ActivatedRoute, private applicationStateService: ApplicationStateInformationService) { }
  readonly PAGE_SIZE = 100000; //for api

  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5, 10, 20];
  searchTermTmp: string = '';
  applicationStateFilterTmp: string = '';
  filteredBootcampList: ApplicationInformatinListItemDto = this.applicationList;

  ngOnInit(): void {
    this.getApplicationStates();
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE })
    this.visibleData();
    this.pageNumbers();
  }

  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.applicationService.getList(pageRequest).subscribe((response) => {
      this.applicationList = response;
    })
    this.isLoading = false;
  }

  getApplicationStates() {
    this.isLoading = true;
    this.applicationStateService.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }).subscribe((response) => {
      this.applicationStates = response.items;
    })
    this.isLoading = false;
  }

  visibleData() {
    let startIndex = (this.currentPageNumber - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    if (this.filteredBootcampList.items.length == 0 && this.searchTermTmp == '' && this.applicationStateFilterTmp == '') {
      return this.applicationList.items.slice(startIndex, endIndex);
    }
    return this.filteredBootcampList.items.slice(startIndex, endIndex);
  }

  nextPage() {
    this.currentPageNumber++;
    this.visibleData();

  }

  previousPage() {
    this.currentPageNumber--;
    this.visibleData();
  }

  pageNumbers() {
    let totalPages: number;

    if (this.filteredBootcampList.items.length == 0 && this.searchTermTmp == '' && this.applicationStateFilterTmp == '') {
      totalPages = Math.ceil(this.applicationList.items.length / this.pageSize);
    }
    else {
      totalPages = Math.ceil(this.filteredBootcampList.items.length / this.pageSize);
    }

    let pageNumArray = new Array(totalPages);
    return pageNumArray;
  }

  changePage(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.visibleData();
  }

  changePageSize(pageSize: string) {
    this.pageSize = parseInt(pageSize, 10);
    this.visibleData();
  }


  filterData(searchTerm: string) {
    this.searchTermTmp = searchTerm;

    if (this.applicationStateFilterTmp !== '') {
      this.filteredBootcampList.items = this.applicationList.items.filter((item) => {
        return item.applicationStateInformationName === this.applicationStateFilterTmp && Object.values(item).some((val) => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    } else {
      this.filteredBootcampList.items = this.applicationList.items.filter((item) => {
        return Object.values(item).some((val) => {
          return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    this.visibleData();
  }

  filterByApplicationState(applicationStateName: string) {
    this.applicationStateFilterTmp = applicationStateName;

    if (applicationStateName === '') {
      this.filteredBootcampList.items = this.applicationList.items;
    } else {
      this.filteredBootcampList.items = this.applicationList.items.filter((item) => {
        return item.applicationStateInformationName === applicationStateName;
      });
    }

    this.visibleData();
  }


}

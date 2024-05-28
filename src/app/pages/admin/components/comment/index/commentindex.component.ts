import { Component, OnInit } from '@angular/core';
import { PageRequest } from '../../../../../core/models/page-request';
import { CommentListItemDto } from '../../../../../features/models/responses/comment/comment-list-item-dto';
import { CommentService } from '../../../../../features/services/concretes/comment.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-commentindex',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './commentindex.component.html',
  styleUrl: './commentindex.component.css'
})
export class CommentindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; // for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5, 10, 20];
  isLoading: boolean = false;
  filterStatus: boolean = false;
  constructor(private commentService: CommentService) { }

  commentList: CommentListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredCommentList: CommentListItemDto = { ...this.commentList }; // Copy the commentList
  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }

  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.commentService.getList(pageRequest).subscribe((response) => {
      this.commentList = response;
      this.applyFilter("all"); // Apply filter after getting the list
      this.isLoading = false;
    });
  }

  visibleData() {
    let startIndex = (this.currentPageNumber - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    return this.filteredCommentList.items.slice(startIndex, endIndex);
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
    let totalPages: number = Math.ceil(this.filteredCommentList.items.length / this.pageSize);
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

  filterByStatus(status: string) {
    if (status === "true") {
      this.filterStatus = true;
    } else if (status === "false") {
      this.filterStatus = false;
    }
    this.applyFilter(status);
  }

  private applyFilter(status?:string) {
    if (status != "all") {
      this.filteredCommentList.items = this.commentList.items.filter((item) => {
        return item.status === this.filterStatus;
      });
    } else {
      this.filteredCommentList = { ...this.commentList }; // Reset filter
    }
    this.visibleData();
  }
}
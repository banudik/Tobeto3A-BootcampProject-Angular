import { DOCUMENT } from '@angular/common';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InstructorComponent } from "../../features/components/instructor/instructor.component";
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { BootcampListItemDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../core/models/page-request';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { InstructorListItemDto } from '../../features/models/responses/instructor/instructor-list-item-dto';
import { AnnouncementService } from '../../features/services/concretes/announcement.service';
import { GetListAnnouncementResponse } from '../../features/models/responses/announcement/get-list-announcement-response';





@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [CommonModule, HttpClientModule, InstructorComponent, RouterModule]

})
export class HomepageComponent implements OnInit{

  dateNow = Date.now();
  currentPageNumber!: number;
  pageSizes: Array<number> = [6];
  PAGE_SIZE: number =6;
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
  announcementList!:GetListAnnouncementResponse[];

    
constructor(
    private instructorService: InstructorService,
    private activatedRoute: ActivatedRoute,
    private announcementService:AnnouncementService,
    private bootcampService: BootcampService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document:Document,
) { }
ngOnInit() {
  window.scrollTo(0,0);
    // Ana JS dosyalarını yükleme
    this.loadScript('assets/homepageAssets/js/jquery.min.js');
    this.loadScript('assets/homepageAssets/js/bootstrap.min.js');
    this.loadScript('assets/homepageAssets/js/magnific-popup.min.js');
    this.loadScript('assets/homepageAssets/js/nice-select.min.js');
    this.loadScript('assets/homepageAssets/js/jquery.mixitup.min.js');
    this.loadScript('assets/homepageAssets/js/appear.min.js');
    this.loadScript('assets/homepageAssets/js/sticky-sidebar.min.js');
    this.loadScript('assets/homepageAssets/js/odometer.min.js');
    this.loadScript('assets/homepageAssets/js/owl.carousel.min.js');
    this.loadScript('assets/homepageAssets/js/meanmenu.min.js');
    this.loadScript('assets/homepageAssets/js/wow.min.js');
    this.loadScript('assets/homepageAssets/js/main.js');

    this.getInstructors();
    this.getAnnouncements();
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE });
}
private loadScript(url: string) {
    const script = this.renderer2.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    this.renderer2.appendChild(this._document.body, script);
  }
  getInstructors() {
    this.isLoading = true;
    this.instructorService.GetListAll().subscribe((response) => {
      this.instructors = response;
      this.isLoading = false;
    });
  }

  getAnnouncements(){
    this.isLoading = true;
    this.announcementService.getList({pageIndex:0,pageSize:8}).subscribe((response) =>{
      this.announcementList = response.items;
      this.isLoading = false;
    })
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
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    this.lowerCurrentPageNumber();
    this.applyFilters({ pageIndex: previousPageIndex, pageSize: this.PAGE_SIZE });
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

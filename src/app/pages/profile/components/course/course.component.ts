import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicantService } from '../../../../features/services/concretes/applicant.service';
import { GetByIdApplicantResponse } from '../../../../features/models/responses/applicant/get-by-id-applicant-response';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../../core/models/page-request';
import { HttpClientModule } from '@angular/common/http';
import { InstructorComponent } from '../../../../features/components/instructor/instructor.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{

  getApplicantByIdResponse!:GetByIdApplicantResponse
  isLoading: boolean = false;
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


  constructor(private router:Router, private bootcampService: BootcampService, private activatedRoute: ActivatedRoute, private applicantService:ApplicantService,private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document:Document) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      if (params["applicantId"]) {
        this.getApplicantById(params["applicantId"])
      } else { console.log("getById applicant error") }
    })

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
  }

  private loadScript(url: string) {
    const script = this.renderer2.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    this.renderer2.appendChild(this._document.body, script);
  }
  getApplicantById(applicantId: string): void {
    this.applicantService.getApplicantById(applicantId).subscribe(
      (response: GetByIdApplicantResponse) => {
        console.log("geliyor " + response.email);
        this.getApplicantByIdResponse = response;
        this.getBootcampListByApplicant({pageIndex:0,pageSize: 10},this.getApplicantByIdResponse.id);
      },
      (error: any) => {
        console.error('Error fetching applicant:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
      }
    );
  }

  getBootcampListByApplicant(pageRequest: PageRequest, applicantId: string) {
    this.isLoading = true;
    this.bootcampService.getBootcampListByApplicantId(pageRequest, applicantId).subscribe((response) => {
      this.bootcampList = response;
      this.isLoading = false;
      this.updateCurrentPageNumber();
    });
  }
  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }
  visibleData() {
    return this.bootcampList.items;
  }
} 

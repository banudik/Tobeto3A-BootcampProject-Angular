import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { GetByIdApplicantResponse } from '../../features/models/responses/applicant/get-by-id-applicant-response';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  getApplicantByIdResponse!:GetByIdApplicantResponse

  constructor(private router:Router, private activatedRoute: ActivatedRoute, private applicantService:ApplicantService,private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document:Document) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      if (params["userId"]) {
        this.getApplicantById(params["userId"])
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
      },
      (error: any) => {
        console.error('Error fetching applicant:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
      }
    );
  }
} 

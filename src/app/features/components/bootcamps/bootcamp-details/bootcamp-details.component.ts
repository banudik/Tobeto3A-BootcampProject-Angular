import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { GetByIdBootcampResponse } from '../../../models/responses/bootcamp/get-by-id-bootcamp-response';
import { HttpClientModule } from '@angular/common/http';
import { BootcampListGroupComponent } from '../bootcamp-list-group/bootcamp-list-group.component';
import { ApplicationInformationService } from '../../../services/concretes/application-information.service';
import { CreateApplicationInformationRequest } from '../../../models/requests/application-information/create-application-information-request';
import { CreatedApplicationInformationResponse } from '../../../models/responses/application-information/created-application-information-response';
import { LocalStorageService } from '../../../services/concretes/local-storage.service';
import { AuthService } from '../../../services/concretes/auth.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-bootcamp-details',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,BootcampListGroupComponent],
  templateUrl: './bootcamp-details.component.html',
  styleUrl: './bootcamp-details.component.css'
})
export class BootcampDetailsComponent implements OnInit{


  getByIdBootcampResponse !: GetByIdBootcampResponse
  bootcampId: number = 1;
  // activatedRoute: any;
  // bootcampService: any;

  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute
     ,private applicationInformationService:ApplicationInformationService, private localStorageService:LocalStorageService
    ,private authService:AuthService,    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document:Document) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      if (params["bootcampId"]) {
        this.getBootcampById(params["bootcampId"])
      } else { console.log("getById bootcamp error") }
    })
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
  }
  private loadScript(url: string) {
    const script = this.renderer2.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    this.renderer2.appendChild(this._document.body, script);
  }

  getBootcampById(bootcampId: number): void {
    this.bootcampService.getBootcampById(bootcampId).subscribe(
      (response: GetByIdBootcampResponse) => {
        console.log("geliyor " + response.name);
        this.getByIdBootcampResponse = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        console.log("getBootcampById error");
      }
    );
  }

  isExpired(endDate: Date): boolean {
    return new Date(endDate) < new Date(); // endDate, geçmiş bir tarihe sahipse true döndürür
  }

// addApplication metodu
addApplication(bootcampId: number) {
  // CreateApplicationInformationRequest nesnesi oluşturma
  const token = this.authService.getDecodedToken();
  console.log(token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  

  const createApplicationRequest: CreateApplicationInformationRequest = {
    bootcampId: bootcampId,
    applicantId: token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
    ApplicationStateInformationId: 2 // default olarak 1 değeri atanıyor
  };

  // Servis çağrısı ve abonelik
  this.applicationInformationService.addApplication(createApplicationRequest).subscribe((response: any) => {
    console.log("application yapıldı");
  });
}
}

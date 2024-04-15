import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    ,private authService:AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      if (params["bootcampId"]) {
        this.getBootcampById(params["bootcampId"])
      } else { console.log("getById bootcamp error") }
    })
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

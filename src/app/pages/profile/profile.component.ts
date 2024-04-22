import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { GetByIdApplicantResponse } from '../../features/models/responses/applicant/get-by-id-applicant-response';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  getApplicantByIdResponse!:GetByIdApplicantResponse

  constructor(private router:Router, private activatedRoute: ActivatedRoute, private applicantService:ApplicantService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      if (params["userId"]) {
        this.getApplicantById(params["userId"])
      } else { console.log("getById applicant error") }
    })
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

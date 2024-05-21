import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdApplicantResponse } from '../../../../../features/models/responses/applicant/get-by-id-applicant-response';
import { ApplicantService } from '../../../../../features/services/concretes/applicant.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applicantdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './applicantdetails.component.html',
  styleUrl: './applicantdetails.component.css'
})
export class ApplicantdetailsComponent implements OnInit{
  currentApplicant!:GetByIdApplicantResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getApplicantById(params["applicantId"])
  })
  }

  constructor(private applicantService:ApplicantService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}

  getApplicantById(id:string){
    this.applicantService.getApplicantById(id).subscribe(
      (response: GetByIdApplicantResponse) => {
        this.currentApplicant = response;
        
      },
      (error: any) => {
        console.error('Error fetching applicant:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicantindex'])
        },2000)
      }
    );

  }
}

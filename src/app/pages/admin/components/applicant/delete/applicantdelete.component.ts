import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicantResponse } from '../../../../../features/models/responses/applicant/get-by-id-applicant-response';
import { ApplicantService } from '../../../../../features/services/concretes/applicant.service';
import { DeletedApplicantResponse } from '../../../../../features/models/responses/applicant/deleted-applicant-response';

@Component({
  selector: 'app-applicantdelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './applicantdelete.component.html',
  styleUrl: './applicantdelete.component.css'
})
export class ApplicantdeleteComponent implements OnInit{
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

  deleteApplicant(id:string){
    this.applicantService.delete(id).subscribe(
      (response: DeletedApplicantResponse) => {
        this.router.navigate(['/adminpanel/applicantindex'])
      },
      (error: any) => {
        console.error('Error fetching Applicant:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicantindex'])
        },1)
      }
    );
  }
}

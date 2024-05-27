import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdApplicationInformationResponse } from '../../../../../features/models/responses/application-information/get-by-id-application-information-response';
import { ApplicationInformationService } from '../../../../../features/services/concretes/application-information.service';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicationdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './applicationdetails.component.html',
  styleUrl: './applicationdetails.component.css'
})
export class ApplicationdetailsComponent implements OnInit{
  currentApplication!:GetByIdApplicationInformationResponse;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getApplicationById(params["applicationId"])
  })
  }

  constructor(private formBuilder:FormBuilder,private applicationService:ApplicationInformationService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}



  getApplicationById(id:number){
    this.applicationService.getById(id).subscribe(
      (response: GetByIdApplicationInformationResponse) => {
        this.currentApplication = response;
      },
      (error: any) => {
        console.error('Error fetching application:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicationindex'])
        },2000)
      }
    );

  }
}

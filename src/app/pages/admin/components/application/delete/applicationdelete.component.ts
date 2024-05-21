import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicationInformationResponse } from '../../../../../features/models/responses/application-information/get-by-id-application-information-response';
import { ApplicationInformationService } from '../../../../../features/services/concretes/application-information.service';
import { DeletedApplicationInformationResponse } from '../../../../../features/models/responses/application-information/deleted-application-information-response';

@Component({
  selector: 'app-applicationdelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './applicationdelete.component.html',
  styleUrl: './applicationdelete.component.css'
})
export class ApplicationdeleteComponent implements OnInit{
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

  deleteApplication(id:number){
    this.applicationService.delete(id).subscribe(
      (response: DeletedApplicationInformationResponse) => {
        this.router.navigate(['/adminpanel/applicationindex'])
      },
      (error: any) => {
        console.error('Error fetching application:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicationindex'])
        },1)
      }
    );
  }
}

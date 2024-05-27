import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdApplicationStateInformationResponse } from '../../../../../features/models/responses/application-state-information/get-by-id-application-state-information-response';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicationstatedetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './applicationstatedetails.component.html',
  styleUrl: './applicationstatedetails.component.css'
})
export class ApplicationstatedetailsComponent  implements OnInit{
  currentApplicationState!:GetByIdApplicationStateInformationResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBootcampStateById(params["applicationStateId"])
  })
  }

  constructor(private applicationStateService:ApplicationStateInformationService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}

  getBootcampStateById(id:number){
    this.applicationStateService.getById(id).subscribe(
      (response: GetByIdApplicationStateInformationResponse) => {
        this.currentApplicationState = response;
        
      },
      (error: any) => {
        console.error('Error fetching applicationState:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicationstateindex'])
        },2000)
      }
    );

  }
}

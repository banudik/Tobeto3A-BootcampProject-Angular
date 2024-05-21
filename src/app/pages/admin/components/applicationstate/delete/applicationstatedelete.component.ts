import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdApplicationStateInformationResponse } from '../../../../../features/models/responses/application-state-information/get-by-id-application-state-information-response';
import { ApplicationStateInformationService } from '../../../../../features/services/concretes/application-state-information.service';
import { DeletedApplicationStateInformationResponse } from '../../../../../features/models/responses/application-state-information/deleted-application-state-information-response';

@Component({
  selector: 'app-applicationstatedelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './applicationstatedelete.component.html',
  styleUrl: './applicationstatedelete.component.css'
})
export class ApplicationstatedeleteComponent   implements OnInit{
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

  deleteApplicationState(id:number){
    this.applicationStateService.delete(id).subscribe(
      (response: DeletedApplicationStateInformationResponse) => {
        this.router.navigate(['/adminpanel/applicationstateindex'])
      },
      (error: any) => {
        console.error('Error fetching ApplicationState:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/applicationstateindex'])
        },1)
      }
    );
  }
}

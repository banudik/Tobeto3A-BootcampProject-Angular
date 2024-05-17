import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdBootcampStateResponse } from '../../../../../features/models/responses/bootcamp-state/get-by-id-bootcamp-state-response';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootcampstatedetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './bootcampstatedetails.component.html',
  styleUrl: './bootcampstatedetails.component.css'
})
export class BootcampstatedetailsComponent implements OnInit{
  currentBootcampState!:GetByIdBootcampStateResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBootcampStateById(params["bootcampStateId"])
  })
  }

  constructor(private bootcampStateService:BootcampStateService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}

  getBootcampStateById(id:number){
    this.bootcampStateService.getById(id).subscribe(
      (response: GetByIdBootcampStateResponse) => {
        this.currentBootcampState = response;
        console.log(this.currentBootcampState.name + " " + this.currentBootcampState.id);
        
      },
      (error: any) => {
        console.error('Error fetching bootcampState:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/bootcampstateindex'])
        },2000)
      }
    );

  }
}

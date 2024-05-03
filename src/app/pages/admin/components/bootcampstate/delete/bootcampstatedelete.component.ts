import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdBootcampStateResponse } from '../../../../../features/models/responses/bootcamp-state/get-by-id-bootcamp-state-response';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { DeletedBootcampStateResponse } from '../../../../../features/models/responses/bootcamp-state/deleted-bootcamp-state-response';

@Component({
  selector: 'app-bootcampstatedelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './bootcampstatedelete.component.html',
  styleUrl: './bootcampstatedelete.component.css'
})
export class BootcampstatedeleteComponent  implements OnInit{
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

  deleteBootcampState(id:number){
    this.bootcampStateService.delete(id).subscribe(
      (response: DeletedBootcampStateResponse) => {
        this.router.navigate(['/adminpanel/bootcampstateindex'])
      },
      (error: any) => {
        console.error('Error fetching bootcampState:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/bootcampstateindex'])
        },1)
      }
    );
  }
}

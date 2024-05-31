import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdBootcampResponse } from '../../../../../features/models/responses/bootcamp/get-by-id-bootcamp-response';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';

@Component({
  selector: 'app-bootcampdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './bootcampdetails.component.html',
  styleUrl: './bootcampdetails.component.css'
})
export class BootcampdetailsComponent implements OnInit{
  currentBootcamp!:GetByIdBootcampResponse;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBootcampById(params["bootcampId"])
  })
  }

  constructor(private formBuilder:FormBuilder,private bootcampService:BootcampService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}



  getBootcampById(id:number){
    this.bootcampService.getBootcampById(id).subscribe(
      (response: GetByIdBootcampResponse) => {
        this.currentBootcamp = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/bootcampindex'])
        },2000)
      }
    );

  }
}

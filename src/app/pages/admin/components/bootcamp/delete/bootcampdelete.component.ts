import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdBootcampResponse } from '../../../../../features/models/responses/bootcamp/get-by-id-bootcamp-response';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { DeletedBootcampResponse } from '../../../../../features/models/responses/bootcamp/deleted-bootcamp-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bootcampdelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './bootcampdelete.component.html',
  styleUrl: './bootcampdelete.component.css'
})
export class BootcampdeleteComponent implements OnInit{
  currentBootcamp!:GetByIdBootcampResponse;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBootcampById(params["bootcampId"])
  })
  }

  constructor(private formBuilder:FormBuilder,private bootcampService:BootcampService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute,private toastr:ToastrService
  ){}



  getBootcampById(id:number){
    this.bootcampService.getBootcampById(id).subscribe(
      (response: GetByIdBootcampResponse) => {
        this.currentBootcamp = response;
      },
      (error: any) => {
        this.toastr.error('Error fetching bootcamp: ' + error.message);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/bootcampindex'])
        },2000)
      }
    );

  }

  deleteBootcamp(id:number){
    this.bootcampService.delete(id).subscribe(
      (response: DeletedBootcampResponse) => {
        this.toastr.success("successfully Deleted!");
        this.router.navigate(['/adminpanel/bootcampindex'])
      },
      (error: any) => {
        this.toastr.error('Error fetching bootcamp: ' + error.message);
        //console.error('Error fetching bootcamp:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/bootcampindex'])
        },1)
      }
    );
  }
}

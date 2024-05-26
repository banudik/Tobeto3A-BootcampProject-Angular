import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdInstructorResponse } from '../../../../../../features/models/responses/instructor/get-by-id-instructor-response';
import { InstructorService } from '../../../../../../features/services/concretes/instructor.service';

@Component({
  selector: 'app-instructoradminprofiledetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './instructoradminprofiledetails.component.html',
  styleUrl: './instructoradminprofiledetails.component.css'
})
export class InstructoradminprofiledetailsComponent  implements OnInit{
  currentInstructor!:GetByIdInstructorResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getInstructorById(params["instructorId"])
  })
  }

  constructor(private instructorService:InstructorService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}

  getInstructorById(id:string){
    this.instructorService.getInstructorById(id).subscribe(
      (response: GetByIdInstructorResponse) => {
        this.currentInstructor = response;
        
      },
      (error: any) => {
        console.error('Error fetching instructor:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/'])
        },2000)
      }
    );

  }
}

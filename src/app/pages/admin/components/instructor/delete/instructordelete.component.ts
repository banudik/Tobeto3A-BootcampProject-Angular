import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdInstructorResponse } from '../../../../../features/models/responses/instructor/get-by-id-instructor-response';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { DeletedInstructorResponse } from '../../../../../features/models/responses/instructor/deleted-instructor-response';

@Component({
  selector: 'app-instructordelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './instructordelete.component.html',
  styleUrl: './instructordelete.component.css'
})
export class InstructordeleteComponent implements OnInit{
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
          this.router.navigate(['/adminpanel/instructorindex'])
        },2000)
      }
    );

  }

  deleteInstructor(id:string){
    this.instructorService.delete(id).subscribe(
      (response: DeletedInstructorResponse) => {
        this.router.navigate(['/adminpanel/instructorindex'])
      },
      (error: any) => {
        console.error('Error fetching Instructor:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/instructorindex'])
        },1)
      }
    );
  }
}
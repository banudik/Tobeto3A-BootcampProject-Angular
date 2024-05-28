import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdEmployeeResponse } from '../../../../../features/models/responses/employee/get-by-id-employee-response';
import { EmployeeService } from '../../../../../features/services/concretes/employee.service';

@Component({
  selector: 'app-employeedetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './employeedetails.component.html',
  styleUrl: './employeedetails.component.css'
})
export class EmployeedetailsComponent implements OnInit{
  currentEmployee!:GetByIdEmployeeResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getEmployeeById(params["employeeId"])
  })
  }

  constructor(private employeeService:EmployeeService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute
  ){}

  getEmployeeById(id:string){
    this.employeeService.getEmployeeById(id).subscribe(
      (response: GetByIdEmployeeResponse) => {
        this.currentEmployee = response;
        
      },
      (error: any) => {
        console.error('Error fetching employee:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/employeeindex'])
        },2000)
      }
    );

  }
}

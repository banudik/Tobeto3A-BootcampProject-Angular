import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { GetByIdEmployeeResponse } from '../../../../../features/models/responses/employee/get-by-id-employee-response';
import { EmployeeService } from '../../../../../features/services/concretes/employee.service';
import { CommonModule } from '@angular/common';
import { DeletedEmployeeResponse } from '../../../../../features/models/responses/employee/deleted-employee-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employeedelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './employeedelete.component.html',
  styleUrl: './employeedelete.component.css'
})
export class EmployeedeleteComponent  implements OnInit{
  currentEmployee!:GetByIdEmployeeResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getEmployeeById(params["employeeId"])
  })
  }

  constructor(private employeeService:EmployeeService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute,private toastr:ToastrService
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

  deleteEmployee(id:string){
    this.employeeService.delete(id).subscribe(
      (response: DeletedEmployeeResponse) => {
        this.toastr.success("Employee Deleted Successfully");
        this.router.navigate(['/adminpanel/employeeindex'])
      },
      (error: any) => {
        this.toastr.error('Error fetching Employee:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/employeeindex'])
        },1)
      }
    );
  }
}
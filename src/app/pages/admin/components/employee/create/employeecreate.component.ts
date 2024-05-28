import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CreateEmployeeRequest } from '../../../../../features/models/requests/employee/create-employee-request';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { AuthService } from '../../../../../features/services/concretes/auth.service';

@Component({
  selector: 'app-employeecreate',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './employeecreate.component.html',
  styleUrl: './employeecreate.component.css'
})
export class EmployeecreateComponent  implements OnInit {

  registerForm!: FormGroup;
  formMessage: string | null = null;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router, private httpClient: HttpClient, private change: ChangeDetectorRef,private toastr:ToastrService,private validationHelper: ValidationHelper) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])/), // En az bir büyük harf
        Validators.pattern(/(?=.*[a-z])/), // En az bir küçük harf
        Validators.pattern(/(?=.*[0-9])/), // En az bir rakam
        Validators.pattern(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)/) // En az bir özel karakter
      ]],
      position: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      userName: ["", Validators.required],
      nationalIdentity: ["", Validators.required]
    })
  }


  add() {
    if (this.registerForm.valid) {
      let employeeModel: CreateEmployeeRequest = Object.assign({}, this.registerForm.value);
      this.authService.registerEmployee(employeeModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
        },
        error: (error) => {
          this.formMessage = "Employee could not be created!";
          this.change.markForCheck();
        },
        complete: () => {
          this.formMessage = "succesfully added!";
          this.toastr.success("Employee successfully added!");
          this.registerForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/employeeindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {
    
    const nameControl = this.registerForm.get('firstName');
    if(this.registerForm.get('password')?.invalid){
      console.log("invalid ");
      
    }
    if (nameControl && nameControl.invalid) {
      this.formMessage = "Lütfen gerekli alanları doldurun";
      console.log("hata");
      
      return;
    }

    this.add();
  }

}

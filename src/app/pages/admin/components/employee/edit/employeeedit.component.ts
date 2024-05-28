import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdEmployeeResponse } from '../../../../../features/models/responses/employee/get-by-id-employee-response';
import { EmployeeService } from '../../../../../features/services/concretes/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UpdateEmployeeRequest } from '../../../../../features/models/requests/employee/update-employee-request';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '../../../../../core/helpers/format-date';

@Component({
  selector: 'app-employeeedit',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employeeedit.component.html',
  styleUrl: './employeeedit.component.css'
})
export class EmployeeeditComponent implements OnInit {
  currentEmployee!: GetByIdEmployeeResponse;
  EmployeeUpdateForm!: FormGroup
  formMessage: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getEmployeeId(params["employeeId"])
    })
  }

  constructor(private employeeService: EmployeeService,
    private router: Router, private change: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService,private validationHelper: ValidationHelper, private toastr: ToastrService
  ) { }

  getEmployeeId(id: string) {
    this.employeeService.getEmployeeById(id).subscribe(
      (response: GetByIdEmployeeResponse) => {
        this.currentEmployee = response;
        this.createRegisterForm();
        this.loadCurrentEmployee();
      },
      (error: any) => {
        console.error('Error fetching Employee:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(() => {
          this.router.navigate(['/adminpanel/employeeindex'])
        }, 2000)
      }
    );

  }

  createRegisterForm() {
    this.EmployeeUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      // password: ['', [
      //   Validators.minLength(8),
      //   Validators.pattern(/(?=.*[A-Z])/), // En az bir büyük harf
      //   Validators.pattern(/(?=.*[a-z])/), // En az bir küçük harf
      //   Validators.pattern(/(?=.*[0-9])/), // En az bir rakam
      //   Validators.pattern(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)/) // En az bir özel karakter
      // ]],
      position: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      userName: ["", Validators.required],
      nationalIdentity: ["", Validators.required]
    })
  }

  loadCurrentEmployee() {
    // currentInstructor verilerinizi burada yükleyin. Örneğin:

    this.EmployeeUpdateForm.patchValue({
      id: this.currentEmployee.id,
      firstName: this.currentEmployee.firstName,
      lastName: this.currentEmployee.lastName,
      userName: this.currentEmployee.userName,
      email: this.currentEmployee.email,
      dateOfBirth: formatDate(this.currentEmployee.dateOfBirth.toString()),
      nationalIdentity: this.currentEmployee.nationalIdentity,
      position: this.currentEmployee.position
    });
  }

  update() {
    if (this.EmployeeUpdateForm.valid) {
      let employeeModel: UpdateEmployeeRequest = Object.assign({}, this.EmployeeUpdateForm.value);
      this.employeeService.update(employeeModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          this.toastr.success("Employee updated Successfully!");
          (response.id)
        },
        error: (error) => {
          this.toastr.error("failde to update: "+ error.message);
          this.change.markForCheck();
        },
        complete: () => {
          this.formMessage = "Başarıyla Güncellendi";
          this.toastr.success("Employee updated Successfully!");
          this.EmployeeUpdateForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/employeeindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {
    const nameControl = this.EmployeeUpdateForm.get('firstName');

    this.validationHelper.checkValidation(this.EmployeeUpdateForm);

    if (nameControl && nameControl.invalid) {
      this.formMessage = "Lütfen gerekli alanları doldurun";
      return;
    }

    this.update();
  }
}

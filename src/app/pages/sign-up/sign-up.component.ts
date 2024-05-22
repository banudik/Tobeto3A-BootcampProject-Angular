import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../features/services/concretes/local-storage.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../core/helpers/validationtoastrmessagehelper';
import { DarkModeService } from '../../features/services/dark-mode.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  password:string='';
  validations = [
    { condition: this.password.length >= 8, message: 'It must be at least 8 characters.' },
    { condition: /[a-z]/.test(this.password), message: 'It must contain at least one lowercase letter.' },
    { condition: /[A-Z]/.test(this.password), message: 'It must contain at least one uppercase letter.' },
    { condition: /\d/.test(this.password), message: 'It must contain at least one digit.' },
    { condition: /[!@#$%^&*(),.?":{}|<>]/.test(this.password), message: 'It must contain at least one special character.' }
  ];

  private readonly apiUrl:string = `${environment.API_URL}/`

  registerForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private router:Router,private httpClient:HttpClient,private localStorage:LocalStorageService,private toastr:ToastrService,private validationHelper: ValidationHelper){}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
   this.registerForm=this.formBuilder.group({
    firstName:["",Validators.required],  
    lastName:["",Validators.required],  
    email:["",[Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/.*[A-Z].*/), // Büyük harf
      Validators.pattern(/.*[a-z].*/), // küçük harf
      Validators.pattern(/.*[0-9].*/), // sayı
      Validators.pattern(/.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+.*/) // özel karakter
    ]],
    about:["",Validators.required],
    dateOfBirth:["",Validators.required],
    userName:["",Validators.required],
    nationalIdentity:["",Validators.required]
   })
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.registerApplicant(registerModel).subscribe((response:any)=>{
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1000);
      }, (errorResponse: any) => { 
          errorResponse.error.Errors.forEach((error: any) => {
            console.error(`Property: ${error.Property}`);
            error.Errors.forEach((errorMessage: string) => {
              alert(`Error: ${errorMessage}`);
            });
          });
        })
    }
  }

  validatePassword() {
    const PasswordControl = this.registerForm.get('password');
  
    // Yeni şifre kontrolünün değeri
    const newPasswordValue = PasswordControl?.value;
  
    // Şifre uzunluğu en az 8 karakter olmalı
    this.validations[0].condition = newPasswordValue.length >= 8;
  
    // En az bir küçük harf içermeli
    this.validations[1].condition = /[a-z]/.test(newPasswordValue);
  
    // En az bir büyük harf içermeli
    this.validations[2].condition = /[A-Z]/.test(newPasswordValue);
  
    // En az bir rakam içermeli
    this.validations[3].condition = /\d/.test(newPasswordValue);
  
    // En az bir özel karakter içermeli
    this.validations[4].condition = /[!@#$%^&*(),.?":{}|<>]/.test(newPasswordValue);

    // this.passwordForm.get('confirmPassword')?.setErrors({ passwordMismatch: newPasswordValue !== confirmPasswordValue });
    // if (newPasswordValue !== confirmPasswordValue) {
    //   confirmPasswordControl?.setErrors({ passwordMismatch: true });
    // } else {
    //   confirmPasswordControl?.setErrors(null);
    // }

  }

  checkFormValidity() {
    if (this.registerForm.invalid) {
      this.showValidationError();
    } else {
      this.register();
    }
  }


  showValidationError() {
    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
    this.toastr.warning('Please fill in all required fields.', 'Warning');
  }

  isFieldInvalid(field: string) {
    const control = this.registerForm.get(field);
    return control?.invalid && (control.dirty || control.touched);
  }

  darkModeService: DarkModeService = inject(DarkModeService);
}
 
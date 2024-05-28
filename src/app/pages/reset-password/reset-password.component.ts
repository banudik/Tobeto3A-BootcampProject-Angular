import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ResetPasswordRequest } from '../../features/models/requests/auth/reset-password-request';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../features/services/concretes/dark-mode.service';



@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  newPassword: string = '';
  token!:string;
  validations = [
    { condition: this.newPassword.length >= 8, message: 'It must be at least 8 characters.' },
    { condition: /[a-z]/.test(this.newPassword), message: 'It must contain at least one lowercase letter.' },
    { condition: /[A-Z]/.test(this.newPassword), message: 'It must contain at least one uppercase letter.' },
    { condition: /\d/.test(this.newPassword), message: 'It must contain at least one digit.' },
    { condition: /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword), message: 'It must contain at least one special character.' }
  ];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private toastr: ToastrService){}

  ngOnInit(): void {
    // url üzerinde gelen tokeni alır
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.router.navigate(['/homepage']);
      }
        window.scrollTo(0,0);
      
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/\d/),
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
      ])],
      confirmPassword: ['', Validators.required]
    });
  }

  resetPassword() {
    const newPasswordControl = this.passwordForm.get('newPassword');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');

    const newPasswordValue = newPasswordControl?.value;
    const confirmPasswordValue = confirmPasswordControl?.value;

    if (this.passwordForm.valid && newPasswordValue==confirmPasswordValue) {
      let PasswordModel: ResetPasswordRequest = {password: this.passwordForm.get('newPassword')?.value};
      this.authService.resetPassword(this.token,PasswordModel);
      this.toastr.success('Şifre Sıfırlama Başarılı')
      console.log(PasswordModel,this.token)
        }
        else{
          this.toastr.error('Şifreler uyuşmuyor')
        }
      }

  
//yeni şifre için dinamik validasyon koşulları
  validatePassword() {
    const newPasswordControl = this.passwordForm.get('newPassword');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');
  
    // Yeni şifre kontrolünün değeri
    const newPasswordValue = newPasswordControl?.value;
    const confirmPasswordValue = confirmPasswordControl?.value;
  
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
    if (newPasswordValue !== confirmPasswordValue) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }

  }

  darkModeService: DarkModeService = inject(DarkModeService);
}
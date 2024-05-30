import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../features/models/requests/auth/user-for-login-request';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserForLoginWithVerifyRequest } from '../../features/models/requests/auth/user-for-loginWithVerify-request';
import { DarkModeService } from '../../features/services/concretes/dark-mode.service';
import { ForgotPasswordRequest } from '../../features/models/requests/auth/forgot-password-request';
import { ValidationHelper } from '../../core/helpers/validationtoastrmessagehelper';
import { Subscription, debounceTime, take } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  showAuthenticatorCodeInput:boolean = false;
  showForgotPassword: boolean = false; 
  forgotPasswordEmail!: ForgotPasswordRequest;
  forgotPassword!:FormGroup;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router,private toastrService:ToastrService,private change:ChangeDetectorRef,private validationHelper:ValidationHelper){}

  ngOnInit(): void {
    this.createLoginForm();
    window.scrollTo(0,0);
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",[Validators.required, Validators.email]],
      password:["",Validators.required],
      authenticatorCode:[null]
    })
  }

  createForgotPasswordMail(){
    this.forgotPassword=this.formBuilder.group({
      email:["",[Validators.required, Validators.email]]})
  }

  // Kullanıcının girdiği bilgileri apiye post isteği atar (email,password olarak sadece 2 parametre gönderir)
  // Kullanıcın EmailVerify yaptığı durumlarda token dönmez 2FA pop-up açılır ve kullanıcıya mail gönderilir
  // EmailVerify yapılmadı ise response olarak accesstoken döner
  login() {
    if (this.loginForm.valid) {
      let loginModel: UserForLoginRequest = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe({
        next: (response) => {
          debounceTime(500)
          if (response.accessToken) {
            this.showAuthenticatorCodeInput = false;
            this.router.navigate(['homepage']);
            this.toastrService.success('Login successful', 'Welcome');
          } 
          else {
            this.toastrService.info('The verification code has been sent to your e-mail address.', 'Verification Code');
            this.showAuthenticatorCodeInput = true;
          }
        }
      }
    );
    }
    else{
      this.validationHelper.checkValidation(this.loginForm);
    }
  }

  // girilen doğrulama kodunu apiye gönderir (email,password,activationKey olarak 3 parametre gönderir) başarılı olursa tokeni kaydeder
  verifyCode() {
      let loginModel2: UserForLoginWithVerifyRequest = Object.assign({}, this.loginForm.value);
      this.authService.loginWithVerify(loginModel2).pipe(
        debounceTime(300)
      ).subscribe({
        next:()=>{
          this.onCancel();
          this.router.navigate(['homepage']);
          this.toastrService.success('Login Successful', 'Welcome');
        },
        error:(error) => {
          return console.log("Login Verify error");
        }
      });
  }

  sendForgotPasswordEmail() {
    if (this.forgotPassword.valid) {
      const forgotPasswordModel: ForgotPasswordRequest = Object.assign({}, this.forgotPassword.value);
      this.authService.sendForgotPasswordEmail(forgotPasswordModel).subscribe({
        next: (response) => {
          console.log('Forgot my password email has been sent.');
        }
      });
    } else {
      // Eğer form geçerli değilse toastr ile uyarı göster
      this.toastrService.warning('Please enter a valid email address.', 'Warning');
    }
  }
  
  // Doğrulama kodu girilen pop-up'ı kapatır
  onCancel() {
    this.showAuthenticatorCodeInput = false;
  }

  darkModeService: DarkModeService = inject(DarkModeService);
  // Şifremi unuttum Cardını açar Logini kapatır
  showForgotPasswordForm() {
    this.showForgotPassword = true;
    this.createForgotPasswordMail();
    this.loginForm.reset(); 
  }

  //Şifremi unuttum kısmından login ekranına geri döner
  goBack() {
    this.showForgotPassword = false;
  }
}  

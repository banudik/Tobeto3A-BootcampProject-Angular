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
import { DarkModeService } from '../../features/services/dark-mode.service';
import { ForgotPasswordRequest } from '../../features/models/requests/auth/forgot-password-request';
import { ValidationHelper } from '../../core/helpers/validationtoastrmessagehelper';




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


  // Kullanıcının girdiği bilgileri apiye post isteği atar (email,password olarak sadece 2 parametre gönderir) token dönmez veya dönen tokeni kaydetmez
  // login() {
  //   if (this.loginForm.valid) {
  //     let loginModel: UserForLoginRequest = Object.assign({}, this.loginForm.value);

  //     this.authService.login(loginModel).subscribe({
  //       error:(error)=>{
  //         this.toastrService.error('Giriş Başarısız','Giriş İşlemi');
  //       },
  //       next:()=>{
  //         if(!localStorage.getItem('token')){
  //           this.toastrService.success('Doğrulama kodu mail adresinize gönderildi','Doğrulama Kodu');
  //           this.showAuthenticatorCodeInput = true;
  //         }
  //       }
  //     })
  //   }
  // }

  login() {
    if (this.loginForm.valid) {
      let loginModel: UserForLoginRequest = Object.assign({}, this.loginForm.value);
      console.log(loginModel.email + " " + loginModel.password);
      
      this.authService.login(loginModel).subscribe({
        next: (response) => {
          if (response.accessToken) {
            localStorage.setItem('token', response.accessToken.token);
            this.toastrService.success('Giriş Başarılı', 'Giriş İşlemi');
            this.showAuthenticatorCodeInput = false;
            window.location.reload();
            this.change.detectChanges();
            
            setTimeout(()=>{
              this.router.navigate(['homepage']);
            },2000)
            
          } 
          else {
            this.toastrService.success('Doğrulama kodu mail adresinize gönderildi', 'Doğrulama Kodu');
            this.showAuthenticatorCodeInput = true;
          }
        },
        error: (error) => {
          this.toastrService.error('Giriş Başarısız', 'Giriş İşlemi');
        },
        complete: () => {}
      });
    }
    else{
      this.validationHelper.checkValidation(this.loginForm);
    }
  }

  // girilen doğrulama kodunu apiye gönderir (email,password,activationKey olarak 3 parametre gönderir) başarılı olursa tokeni kaydeder
  verifyCode() {
      let loginModel: UserForLoginWithVerifyRequest = Object.assign({}, this.loginForm.value);
      this.authService.loginWithVerify(loginModel).subscribe({
        next:()=>{
          this.toastrService.success('Giriş Başarılı', 'Giriş işlemi');
          this.onCancel();
        },
        error:() => {
          this.toastrService.error('Giriş Başarısız');
          //console.log(error.message);
        },
        complete:() => {
          this.onCancel();
        },
      });
  }

  sendForgotPasswordEmail() {
    if (this.forgotPassword.valid) {
      let ForgotPasswordModel: ForgotPasswordRequest = Object.assign({}, this.forgotPassword.value);
      this.authService.sendForgotPasswordEmail(ForgotPasswordModel);
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

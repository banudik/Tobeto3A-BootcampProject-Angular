import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../features/models/requests/auth/user-for-login-request';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserForLoginWithVerifyRequest } from '../../features/models/requests/auth/user-for-loginWithVerify-request';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup
  showAuthenticatorCodeInput:boolean = false;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router,private toastrService:ToastrService){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      authenticatorCode:[null]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: UserForLoginRequest = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe({
        error:(error)=>{
          this.toastrService.error('Giriş Başarısız');
          console.log(error.message);
        },
        complete:()=>{
          this.toastrService.success('Doğrulama kodu mail adresinize gönderildi');
          this.showAuthenticatorCodeInput = true;
          // setTimeout(()=>{
          //   this.router.navigate(["/home-page"]);
          // },2000)
        }
      })
    }
  }

  verifyCode() {
      let loginModel: UserForLoginWithVerifyRequest = Object.assign({}, this.loginForm.value);
      // Doğrulama kodu ve diğer giriş bilgileriyle tekrar giriş yap
      this.authService.loginWithVerify(loginModel).subscribe({
        complete:() => {
          this.toastrService.success('Giriş Başarılı', 'Giriş işlemi');
          this.onCancel();
          // setTimeout(() => {
          //   this.router.navigate(["/home-page"]);
          // }, 2000);
        },
        error: (error) => {
          this.toastrService.error('Giriş Başarısız');
          console.log(error.message);
        }
      });
  }

  onCancel() {
    this.showAuthenticatorCodeInput = false;
  }


}  



import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../features/models/requests/auth/user-for-login-request';
import { AuthService } from '../../features/services/concretes/auth.service';
import { tap } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel: UserForLoginRequest = { ...this.loginForm.value };
      
      this.authService.login(loginModel).pipe(
        tap((response) => {
          alert(response.accessToken.expiration);
          this.router.navigate(['homepage']);
        })
      ).subscribe(
        // Hata yönetimi
        (error: any) => {
          alert(error.error);
        }
      );
    } else {
      console.log("validation error");
    }
  }

}  



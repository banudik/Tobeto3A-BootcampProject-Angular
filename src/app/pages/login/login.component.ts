import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../features/models/requests/auth/user-for-login-request';
import { AuthService } from '../../features/services/concretes/auth.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router,private toastrService:ToastrService){}

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
      let loginModel: UserForLoginRequest = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe({
        error:(error)=>{
          this.toastrService.error('Giriş Başarısız ' + error.message)
        },
        complete:()=>{
          this.toastrService.success('Giriş Başarılı','Giriş işlemi',{ timeOut: 2000 });
          // setTimeout(()=>{
          //   this.router.navigate(["/home-page"]);
          // },2000)
        }
      })
    }
    else{
      console.log("validation error");
    }
    
  }



}  



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

  // login() {
  //   if (this.loginForm.valid) {
  //     let loginModel: UserForLoginRequest = { ...this.loginForm.value };
      
  //     this.authService.login(loginModel).pipe(
  //       tap((response) => {
  //         //alert(response.accessToken.expiration);
  //         alert("Login Succesfull!");
  //         this.toastrService.success("Başarılı!");
  //         //this.router.navigate(['homepage']);
  //       })
  //     ).subscribe(
  //       // Hata yönetimi
  //       (error: any) => {
  //         alert(error);
  //       }
  //     );
  //   } 
  login(){
    if(this.loginForm.valid){
      let loginModel:UserForLoginRequest = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{

        //alert('Login succesfull!');
        this.toastrService.success('Login succesfull!','Giriş işlemi',{ timeOut: 2000 });
        //this.router.navigate(['homepage'])
      }
      ,(error:any)=>{
        //alert(error.error)
        this.toastrService.error('Giriş Başarısız ' + error.message)
      })
    }
    else {
      console.log("validation error");
    }
  }

}  



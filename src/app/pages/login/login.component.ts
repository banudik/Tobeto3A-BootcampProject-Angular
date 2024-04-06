import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserForLoginRequest } from '../../features/models/requests/auth/user-for-login-request';
import { AuthService } from '../../features/services/concretes/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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

  login(){
    if(this.loginForm.valid){
      console.log("test1");
      let loginModel:UserForLoginRequest = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        alert(response.accessToken.expiration);
        this.router.navigate(['homepage'])
      }
      ,(error:any)=>{
        alert(error.error)
      })
    }
    else{
      console.log("validation error");
    }
    console.log("test2");
  }

  

}

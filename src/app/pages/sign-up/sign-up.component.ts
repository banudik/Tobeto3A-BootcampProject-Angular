import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  registerForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private router:Router){}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
   this.registerForm=this.formBuilder.group({
    firstName:["",Validators.required],  
    lastName:["",Validators.required],  
    email:["",Validators.required],
    password:["",Validators.required],
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
      this.authService.registerApplicant(registerModel).subscribe((response)=>{
        alert("Kayıt Başarılı")
        this.router.navigate(['login']);
      }, (errorResponse: any) => { 
          errorResponse.error.Errors.forEach((error: any) => {
            console.error(`Property: ${error.Property}`);
            error.Errors.forEach((errorMessage: string) => {
              alert(`Error: ${errorMessage}`);
            });
          });
        })
    }else{
      console.log(this.registerForm.value);
      console.error('Form has validation errors!');
    }
  }
}
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../features/services/concretes/local-storage.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  private readonly apiUrl:string = `${environment.API_URL}/`

  registerForm!:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private router:Router,private httpClient:HttpClient,private localStorage:LocalStorageService,private toastr:ToastrService){}

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
        //alert("Kayıt Başarılı")
        //this.router.navigate(['login']);
        this.toastr.success('Kayıt Başarılı');
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
    // setTimeout(() => {
    //   this.SendVerifyEmail().subscribe(() => {
    //     console.log('Verify email sent successfully.');
    //   }, error => {
    //     console.error('Error sending verify email:', error);
    //   });
    // }, 3000);
  }

  SendVerifyEmail() : Observable<any> { // Authenticate olan kullanıcıya mail gönderir, response döndürmez
    return this.httpClient.get(this.apiUrl+'Auth/EnableEmailAuthenticator');
  }

}
 
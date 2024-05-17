import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {ForgotPasswordRequest } from '../../models/requests/auth/forgot-password-request';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly apiUrl:string = `${environment.API_URL}/auth`


  constructor(private httpClient:HttpClient, private toastr:ToastrService) { }

  sendVerifyEmail(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'accept': 'application/json'
    });
    return this.httpClient.get(`${this.apiUrl}/EnableEmailAuthenticator`, { headers });
  }

  // sendForgotPasswordEmail(ForgotPasswordEmail:ForgotPasswordRequest){
  //   return this.httpClient.post(`${this.apiUrl}/ForgotPassword`, ForgotPasswordEmail).subscribe(
  //     () => {
  //       this.toastr.success('Şifremi unuttum e-postası başarıyla gönderildi.', 'Başarılı');
  //     },
  //     error => {
  //       this.toastr.error('Şifremi unuttum e-postası gönderilirken bir hata oluştu.', 'Hata');
  //       console.error('Şifremi unuttum e-postası gönderilirken bir hata oluştu:', error);
  //     }
  //   );
  // }

  sendForgotPasswordEmail(ForgotPasswordRequest:ForgotPasswordRequest)
    {
      console.log("email servis",ForgotPasswordRequest.email);
      
      this.httpClient.post(`${this.apiUrl}/ForgotPassword`,ForgotPasswordRequest.email)
      .pipe(map(response=>{
        this.toastr.success('Şifremi unuttum e-postası başarıyla gönderildi.', 'Başarılı');
      console.log("email isteği gitti");

          return response;
        }
      ),catchError(responseError=>{
        throw responseError;
      })
      )
    }


}

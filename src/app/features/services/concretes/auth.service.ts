import { Injectable } from '@angular/core';
import { AuthBaseService } from '../abstracts/auth-base.service';
import { Observable, catchError, map } from 'rxjs';
import { UserForRegisterRequest } from '../../models/requests/users/user-for-register-request';
import { UserForRegisterResponse } from '../../models/responses/users/user-for-register-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForLoginRequest } from '../../models/requests/users/user-for-login-request';
import { AccessTokenModel } from '../../models/responses/users/access-token-model';
import { TokenModel } from '../../models/responses/users/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthBaseService {
  fullname!:string;
  userId!:string;
  token:any;
  jwtHelper:JwtHelperService = new JwtHelperService;


  private readonly apiUrl:string = `${environment.API_URL}/auth`
  constructor(private httpClient:HttpClient,private storageService:LocalStorageService) {super() }

  override register(userforRegisterRequest: UserForRegisterRequest)
      :Observable<UserForRegisterResponse> {
    return this.httpClient.post<UserForRegisterResponse>(`${this.apiUrl}/register`,userforRegisterRequest)
  }

  login(userLoginRequest:UserForLoginRequest)
                        :Observable<AccessTokenModel<TokenModel>>

  {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`,userLoginRequest)
    .pipe(map(response=>{
        this.storageService.setToken(response.accessToken.token);
        alert("Giriş yapıldı");
        setTimeout(()=>{
          location.reload
        },400)
        return response;
      }
     
    ),catchError(responseError=>{
      alert(responseError.error)
      throw responseError;
    })
    )
  }


  getDecodedToken(){
    try{
      this.token=this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch(error){
      return error;
    }
  }

  loggedIn():boolean{
    this.token=this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    return !isExpired;
    
  }

  getUserName():string{
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter(x=>x.endsWith("/name"))[0]
    return this.fullname=decoded[propUserName];
  }

  // getUserName():string{
  //   console.log(this.fullname)
  //   return this.fullname;
  // }
  

  getCurrentUserId():string{
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
    return this.userId=decoded[propUserId]
  }


  logOut(){
    this.storageService.removeToken();
    alert("Çıkış yapıldı");
    setTimeout(function(){
      location.reload()
    },400)
  }

  
  
}

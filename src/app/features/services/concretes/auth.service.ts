import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, switchMap, tap, throwError, of, BehaviorSubject } from "rxjs";
import { environment } from "../../../../environments/environment";
import { UserForLoginRequest } from "../../models/requests/auth/user-for-login-request";
import { AccessTokenModel } from "../../models/responses/auth/access-token-model";
import { TokenModel } from "../../models/responses/auth/token-model";
import { AuthBaseService } from "../abstracts/auth-base.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ApplicantForRegisterRequest } from "../../models/requests/auth/applicant-for-register-request";
import { LocalStorageService } from "./local-storage.service";
import { ToastrService } from "ngx-toastr";
import { UserForLoginWithVerifyRequest } from "../../models/requests/auth/user-for-loginWithVerify-request";
import { CreateEmployeeRequest } from "../../models/requests/employee/create-employee-request";
import { CreateInstructorRequest } from "../../models/requests/instructor/create-instructor-request";
import { CreatedEmployeeResponse } from "../../models/responses/employee/created-employee-response";
import { CreatedInstructorResponse } from "../../models/responses/instructor/created-instructor-response";
import { ResetPasswordRequest } from "../../models/requests/auth/reset-password-request";
import { ForgotPasswordRequest } from "../../models/requests/auth/forgot-password-request";


@Injectable({
    providedIn: 'root'
  })
  export class AuthService extends AuthBaseService {




    fullname!:string;
    userId!:string;
    token:any;
    jwtHelper:JwtHelperService = new JwtHelperService;
    claims:string[]=[]
  
  
    private readonly apiUrl:string = `${environment.API_URL}/auth`
    constructor(private httpClient:HttpClient,private storageService:LocalStorageService,private toastrService:ToastrService) {super() }
  

    override registerEmployee(createEmployeeRequest: CreateEmployeeRequest): Observable<CreatedEmployeeResponse> {
      return this.httpClient.post<CreatedEmployeeResponse>(`${this.apiUrl}/registeremployee`, createEmployeeRequest);
    }
    override registerInstructor(createInstructorRequest: CreateInstructorRequest): Observable<CreatedInstructorResponse> {
      return this.httpClient.post<CreatedInstructorResponse>(`${this.apiUrl}/registerinstructor`, createInstructorRequest);
    }

    override registerApplicant(userforRegisterRequest: ApplicantForRegisterRequest): Observable<TokenModel> {
      return this.httpClient.post<TokenModel>(`${this.apiUrl}/registerapplicant`, userforRegisterRequest).pipe(
        switchMap((response: TokenModel) => {
          this.storageService.setToken(response.token);
          return this.sendVerifyEmail().pipe(
            tap(() => {
              this.toastrService.success('Doğrulama maili gönderildi','Giriş Başarılı');
              localStorage.removeItem('token');
            })
          );
        }),
        catchError(error => {
          console.error('Hata:', error);
          this.toastrService.error('Mail gönderilemedi. Lütfen tekrar deneyin.');
          return throwError(error);
        })
      );
    }
    
    sendVerifyEmail(): Observable<any> {

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'accept': 'application/json'
      });
      return this.httpClient.get(`${this.apiUrl}/EnableEmailAuthenticator`, { headers });
    }
  
    //  email ve passwordu login olmak için gönderiyoruz, activationKey kısmı null olarak post ediliyor(aktivasyon kodu null gönderildiği takdirde backend'de AktivasyonKeyi generate ediliyoruz ve mail olarak gönderiliyoruz)
    // login(userLoginRequest:UserForLoginRequest):Observable<AccessTokenModel<TokenModel>>                    
    // {  
    //   return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`,userLoginRequest)
    //   .pipe(map(response=>{
    //       // this.toastrService.success('başarılı');
    //       //alert("Giriş yapıldı");
    //       // setTimeout(()=>{
    //       //   window.location.reload()
    //       // },1000)
    //       return response;
    //     }
    //   ),catchError(responseError=>{
    //     throw responseError;
    //   })
    //   )
    // }

    login(userLoginRequest: UserForLoginRequest): Observable<AccessTokenModel<TokenModel>> {
      return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`, userLoginRequest)
        .pipe(
          tap(response => {
            if (response.accessToken) {
              //this.storageService.setToken(response.accessToken.token);
              this.toastrService.success('Giriş yapıldı');
            }
            else{
              this.toastrService.info('Doğrulama Kodu Gönderildi');
            }
          }),
          catchError(responseError => {
            this.toastrService.error('Giriş başarısız buraa');
            // Eğer responseError'u tekrar fırlatmazsanız, hata vermeden çalışmaya devam eder.
            return of({} as AccessTokenModel<TokenModel>,responseError);  // Hata durumunda Observable<null> döndürülür.
          })
        );
    }

    // pop-up ekranında ki activationKey i alıp tekrar  mevcut email ve password ile post ediliyoruz başarılı olursa response'taki tokeni storage'a kayıt ediyoruz login işlemi bu metod ile bitiyor(kullanıcının tekrar emai ve password girmesi gerekmiyor)
    loginWithVerify(UserWithActivationCode:UserForLoginWithVerifyRequest):Observable<AccessTokenModel<TokenModel>>
    {
      return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`,UserWithActivationCode)
      .pipe(map(response=>{
        this.storageService.setToken(response.accessToken.token);
          // this.toastrService.success('başarılı');
          //alert("Giriş yapıldı");
          // setTimeout(()=>{
          //   window.location.reload()
          // },1000)
          return response;
        }
      ),
      // catchError(responseError=>{
      //   throw responseError;
      // })
      )
    }

    resetPassword(token: string, resetPasswordRequest: ResetPasswordRequest) {
      var tokenn = token;
      console.log(`Bearer ${tokenn}`)
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, 
        'accept': 'application/json'
      });
    
      this.httpClient.post(`${this.apiUrl}/ResetPassword`, resetPasswordRequest, { headers }).pipe(
        catchError(error => {
          console.error('Şifre sıfırlama başarısız:', error);
          return throwError(error);
        })
      )
      .subscribe(
        response => {
          console.log('Şifre sıfırlama başarılı:', response);
        },
        // error => {
        //   console.error('Hata:', error);
        // }
      );
    }

    sendForgotPasswordEmail(ForgotPasswordRequest: ForgotPasswordRequest) {
      this.httpClient.post(`${this.apiUrl}/ForgotPassword`, ForgotPasswordRequest)
        .pipe(
          map(response => {
            console.log("email servis", ForgotPasswordRequest.email);
            this.toastrService.success('Şifremi unuttum e-postası başarıyla gönderildi.', 'Başarılı');
            return response;
          }),).subscribe( 
          response => {
            console.log('Başarılı yanıt:', response);
          },
        );
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
  
    getCurrentUserId():string{
      var decoded = this.getDecodedToken();
      var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
      return this.userId=decoded[propUserId]
    }
  
    logOut(){
      this.storageService.removeToken();
      this.toastrService.success('Çıkış Başarılı','Çıkış İşlemi');
      setTimeout(function(){
        window.location.reload()
      },1000)
    }
  
    getRoles():string[]{
      if(this.storageService.getToken()){
        var decoded = this.getDecodedToken()
        var role = Object.keys(decoded).filter(x=>x.endsWith("/role"))[0]
        this.claims=decoded[role]
      }
      return this.claims;
    }
  
    isAdmin(){
      this.getRoles();
      if(this.claims.includes("admin" && "Admin")){
        return true;
      }
      else{
        return false;
      }
    }

    isEmployee(){
      this.getRoles();
      if(this.claims.includes("Employees.EmployeeRole" && "Employees.EmployeeRole")){
        return true;
      }
      else{
        return false;
      }
    }

    isInstructor(){
      this.getRoles();
      if(this.claims.includes("instructorRole" && "InstructorRole")){
        return true;
      }
      else{
        return false;
      }
    }
  }

  
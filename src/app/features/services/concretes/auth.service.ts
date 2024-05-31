import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Observable, map, catchError, switchMap, tap, throwError, of, BehaviorSubject, debounceTime, take, Subscription, interval } from "rxjs";
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
import { VerifyEmailRequest } from "../../models/requests/auth/verify-email-request";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthBaseService implements OnDestroy {
  private readonly REFRESH_INTERVAL = 1 * 60 * 1000; // 14 dakika
  private refreshInterval: Subscription | null = null;

  fullname!: string;
  userId!: string;
  token: any;
  jwtHelper: JwtHelperService = new JwtHelperService;
  claims: string[] = []

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly apiUrl: string = `${environment.API_URL}/auth`
  
  constructor(private httpClient: HttpClient, private storageService: LocalStorageService, private toastrService: ToastrService, private router: Router) { 
    super()
    this.startTokenRefresh();
   }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  override registerEmployee(createEmployeeRequest: CreateEmployeeRequest): Observable<CreatedEmployeeResponse> {
    return this.httpClient.post<CreatedEmployeeResponse>(`${this.apiUrl}/registeremployee`, createEmployeeRequest);
  }

  override registerInstructor(createInstructorRequest: CreateInstructorRequest): Observable<CreatedInstructorResponse> {
    return this.httpClient.post<CreatedInstructorResponse>(`${this.apiUrl}/registerinstructor`, createInstructorRequest);
  }

  //Ogrenci kayıt olma formunu gönderir
  override registerApplicant(userforRegisterRequest: ApplicantForRegisterRequest): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(`${this.apiUrl}/registerapplicant`, userforRegisterRequest).pipe(
      switchMap((response: TokenModel) => {
        this.storageService.setToken(response.token);
        return this.sendVerifyEmail().pipe(
          tap(() => {
            this.toastrService.success('Doğrulama maili gönderildi', 'Giriş Başarılı');
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


  // kayıt olduktan sonra email doğrulama postası gönderir
  sendVerifyEmail(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'accept': 'application/json'
    });
    return this.httpClient.get(`${this.apiUrl}/EnableEmailAuthenticator`, { headers });
  }

  // EmailVerify epostasındaki link üzerinden alınan ActivationKey gönderilir ve kullanıcının email adresi doğrulanmış olur
  verifyEmailWelcomePage(activationKey: string): Observable<any> {
    console.log(activationKey);
    return this.httpClient.get(`${this.apiUrl}/VerifyEmailAuthenticator?ActivationKey=${encodeURIComponent(activationKey)}`);
  }

  //  email ve passwordu login olmak için gönderilir, activationKey kısmı null olarak post edilir(aktivasyon kodu null gönderildiği takdirde backend'de AktivasyonKeyi generate ediliyoruz ve mail olarak gönderiliyoruz) 2FA'i tetikler
  login(userLoginRequest: UserForLoginRequest): Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`, userLoginRequest, { withCredentials: true })
      .pipe(
        tap(response => {
          if (response.accessToken) {
            this.storageService.setToken(response.accessToken.token);
            this.isLoggedInSubject.next(true);
            this.isAdminSubject.next(true);
          } else {
            //this.toastrService.info('We sent a verification code');
          }
        })
      );
  }


  // pop-up ekranında ki activationKey i alıp tekrar  mevcut email ve password ile post ediliyoruz başarılı olursa response'taki tokeni storage'a kayıt ediyoruz login işlemi bu metod ile bitiyor(kullanıcının tekrar emai ve password girmesi gerekmiyor)
  loginWithVerify(UserWithActivationCode: UserForLoginWithVerifyRequest): Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/login`, UserWithActivationCode,{ withCredentials: true })
      .pipe(take(1),debounceTime(300),map(response => {
        this.storageService.setToken(response.accessToken.token);
        return response;
      }
      )
      )
  }

  //Mevcut refreshtoken ile yeni bir accessToken ister
  refreshToken(): Observable<TokenModel> {
    return this.httpClient.get<TokenModel>(`${this.apiUrl}/refreshToken`, { withCredentials: true });
  }

  //ŞifreSıfırlamak için yeni şifreyi gönderir
  resetPassword(token: string, resetPasswordRequest: ResetPasswordRequest) {
    var tokenn = token;
    console.log(`Bearer ${tokenn}`)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    });

    this.httpClient.post(`${this.apiUrl}/ResetPassword`, resetPasswordRequest, { headers })
    .pipe().subscribe(
        response => {
          this.toastrService.success("You are now redirected to the Login page.","Reset Password Success");
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 1500);
        }
      );
    }

  //Şifremi unuttum kısmında girilen Email adresine şifremi unuttum postası gönderir(Token göndermez)
  sendForgotPasswordEmail(ForgotPasswordRequest: ForgotPasswordRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/ForgotPassword`, ForgotPasswordRequest, { responseType: 'text' }).pipe(
      map(response => {
        this.toastrService.success('Forgot my password email has been sent.', 'Successful');

        return response;
      }),
      // catchError((error) => {
      //   return throwError(error);
      // })
    );
  }

  getDecodedToken() {
    try {
      this.token = this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch (error) {
      return error;
    }
  }

  loggedIn(): boolean {
    return !!this.storageService.getToken();
  }

  getUserName(): string {
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter(x => x.endsWith("/name"))[0]
    return this.fullname = decoded[propUserName];
  }

  getCurrentUserId(): string {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0]
    return this.userId = decoded[propUserId]
  }

  private startTokenRefresh() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
    this.refreshInterval = interval(this.REFRESH_INTERVAL).pipe(
      switchMap(() => this.refreshToken().pipe(
        tap(tokenModel => {
          this.storageService.setToken(tokenModel.token);
          this.isLoggedInSubject.next(true);
        })
      )),
      catchError(err => {
        console.error('Token yenileme hatası:', err);
        return [];
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }

  //Navbar için çıkış metodu
  logOut() {
    //Angular put olarak istek yapıldığı zaman body kısmının boş bırakılmasına izin vermiyor
    //nArch hatası-- Controller HttpGet olarak değiştirildi
    this.httpClient.get(`${this.apiUrl}/revoketoken`,{ withCredentials: true })
      .subscribe({
        next: () => {
          console.log('Revoke Token İsteği yapıldı. ');
           // LocalStorage'daki token'ı temizliyoruz
          this.storageService.remove('token');
          this.isLoggedInSubject.next(false);
          this.isAdminSubject.next(false);
          if (this.refreshInterval) {
            this.refreshInterval.unsubscribe();
          }
          this.router.navigate(['/login']); // Kullanıcıyı login sayfasına yönlendirir
          this.toastrService.success('Exit Successful', 'Exit');
        },
        error: (error) => {
          console.log('Token revoke failed');
        }
      });
  }

  //RefreshToken süresi bittiği zaman AuthInterceptor'da çalışacak çıkış metodu
  logOutForInterceptor() {
    console.log('Interceptor Çıkış yaptı');
          this.storageService.remove('token'); // LocalStorage'daki token'ı temizliyoruz
          this.isLoggedInSubject.next(false);
          this.isAdminSubject.next(false);
    //Angular put olarak istek yapıldığı zaman body kısmının boş bırakılmasına izin vermiyor
    //nArch hatası-- Controller HttpGet olarak değiştirildi
    // this.httpClient.get(`${this.apiUrl}/revoketoken`)
    //   .subscribe({
    //     next: () => {
    //       console.log('istek yapıldı');
    //       this.storageService.remove('token'); // LocalStorage'daki token'ı temizliyoruz
    //       this.isLoggedInSubject.next(false);
    //       this.isAdminSubject.next(false);
    //     },
    //     error: (error) => {
    //       console.log('Token revoke failed');
    //     }
    //   });
  }


  getRoles(): string[] {
    if (this.storageService.getToken()) {
      var decoded = this.getDecodedToken()
      var role = Object.keys(decoded).filter(x => x.endsWith("/role"))[0]
      this.claims = decoded[role]
    }
    return this.claims;
  }

  isAdmin() {
    this.getRoles();
    if (this.claims.includes("admin" && "Admin")) {
      return true;
    }
    else {
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

 
  isInstructor() {
    this.getRoles();
    if (this.claims.includes("instructorRole" && "InstructorRole")) {
      return true;
    }
    else {
      return false;
    }
  }
}


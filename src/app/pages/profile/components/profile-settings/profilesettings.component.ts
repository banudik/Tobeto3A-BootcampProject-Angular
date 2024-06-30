import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetByIdApplicantResponse } from '../../../../features/models/responses/applicant/get-by-id-applicant-response';
import { ApplicantService } from '../../../../features/services/concretes/applicant.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../core/helpers/validationtoastrmessagehelper';
import { UpdateEmployeeRequest } from '../../../../features/models/requests/employee/update-employee-request';
import { GetByIdEmployeeResponse } from '../../../../features/models/responses/employee/get-by-id-employee-response';
import { AuthService } from '../../../../features/services/concretes/auth.service';
import { LocalStorageService } from '../../../../features/services/concretes/local-storage.service';
import { UserForLoginRequest } from '../../../../features/models/requests/auth/user-for-login-request';
import { formatDate } from '../../../../core/helpers/format-date';
import { UpdateApplicantRequest } from '../../../../features/models/requests/applicant/update-applicant-request';

@Component({
  selector: 'app-profilesettings',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './profilesettings.component.html',
  styleUrl: './profilesettings.component.css'
})
export class ProfilesettingsComponent implements OnInit{

  getApplicantByIdResponse!:GetByIdApplicantResponse
  currentUser!: GetByIdApplicantResponse;
  UserUpdateForm!: FormGroup
  userLoginRequest!: UserForLoginRequest;
  showDeleteModal:boolean = false;

  constructor(private router:Router, private activatedRoute: ActivatedRoute, private applicantService:ApplicantService,private renderer2: Renderer2,  private change: ChangeDetectorRef, private formBuilder: FormBuilder, private authService: AuthService,private validationHelper: ValidationHelper, private toastr: ToastrService,private storageService:LocalStorageService,
    @Inject(DOCUMENT) private _document:Document) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      if (params["applicantId"]) {
        this.getApplicantById(params["applicantId"])
      } else { console.log("getById applicant error") }
    })

    this.loadScript('assets/homepageAssets/js/jquery.min.js');
    this.loadScript('assets/homepageAssets/js/bootstrap.min.js');
    this.loadScript('assets/homepageAssets/js/magnific-popup.min.js');
    this.loadScript('assets/homepageAssets/js/nice-select.min.js');
    this.loadScript('assets/homepageAssets/js/jquery.mixitup.min.js');
    this.loadScript('assets/homepageAssets/js/appear.min.js');
    this.loadScript('assets/homepageAssets/js/sticky-sidebar.min.js');
    this.loadScript('assets/homepageAssets/js/odometer.min.js');
    this.loadScript('assets/homepageAssets/js/owl.carousel.min.js');
    this.loadScript('assets/homepageAssets/js/meanmenu.min.js');
    this.loadScript('assets/homepageAssets/js/wow.min.js');
    this.loadScript('assets/homepageAssets/js/main.js');
  }

  private loadScript(url: string) {
    const script = this.renderer2.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    this.renderer2.appendChild(this._document.body, script);
  }
  getApplicantById(applicantId: string): void {
    this.applicantService.getApplicantById(applicantId).subscribe(
      (response: GetByIdApplicantResponse) => {
        this.getApplicantByIdResponse = response;
        this.currentUser = response
        this.createUpdateForm();
        this.loadCurrentUser();
      },
      (error: any) => {
        console.error('Error fetching applicant:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
      }
    );
  }

  getUserById(id: string) {
    this.applicantService.getApplicantById(id).subscribe(
      (response: GetByIdApplicantResponse) => {
        this.currentUser = response;
        this.createUpdateForm();
        this.loadCurrentUser();
      },
      (error: any) => {
        console.error('Error fetching instructor:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
      }
    );

  }

  createUpdateForm() {
    this.UserUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      // password: ['', [
      //   Validators.minLength(8),
      //   Validators.pattern(/(?=.*[A-Z])/), // En az bir büyük harf
      //   Validators.pattern(/(?=.*[a-z])/), // En az bir küçük harf
      //   Validators.pattern(/(?=.*[0-9])/), // En az bir rakam
      //   Validators.pattern(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)/) // En az bir özel karakter
      // ]],
      dateOfBirth: ["", Validators.required],
      userName: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      password: ["",Validators.required],
      about: ["",Validators.required],
      newPassword: ['', [
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])/), // En az bir büyük harf
        Validators.pattern(/(?=.*[a-z])/), // En az bir küçük harf
        Validators.pattern(/(?=.*[0-9])/), // En az bir rakam
        Validators.pattern(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)/) // En az bir özel karakter
      ]],
      newPasswordRepeat: ['', [
        Validators.minLength(8),
        Validators.pattern(/(?=.*[A-Z])/), // En az bir büyük harf
        Validators.pattern(/(?=.*[a-z])/), // En az bir küçük harf
        Validators.pattern(/(?=.*[0-9])/), // En az bir rakam
        Validators.pattern(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)/) // En az bir özel karakter
      ]],
    })
  }

  loadCurrentUser() {
    // currentInstructor verilerinizi burada yükleyin. Örneğin:
    this.UserUpdateForm.patchValue({
      id: this.currentUser.id,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      userName: this.currentUser.userName,
      about: this.currentUser.about,
      email: this.currentUser.email,
      dateOfBirth: formatDate(this.currentUser.dateOfBirth.toString()),
      nationalIdentity: this.currentUser.nationalIdentity,
    });
  }

  update() {
    if (this.UserUpdateForm.valid) {
      let userModel: UpdateApplicantRequest = Object.assign({}, this.UserUpdateForm.value);
      this.applicantService.update(userModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          (response.id)
        },
        error: (error) => {
          this.toastr.error("failde to update: "+ error.message);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("User updated Successfully!");

          // if(userModel.password != null){
          //   this.removeAndSetNewToken(userModel.email,userModel.password,userModel.newPassword);
          // }
          this.UserUpdateForm.reset();
          this.change.markForCheck();
          setTimeout(() => {
            this.router.navigate(['/myprofile/'+this.currentUser.id])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {
    //const nameControl = this.UserUpdateForm.get('firstName');
    //console.log(this.UserUpdateForm.value); 
    
    this.validationHelper.checkValidation(this.UserUpdateForm);
    
    if (this.UserUpdateForm.invalid) {
      this.toastr.error("form is invalid!");
      return;
    }

    if(this.checkIfPasswordsExistAndMatch()){
      this.toastr.error("Passwords Do not Match!");
      return;
    }

    this.update();
  }

  checkIfPasswordsExistAndMatch(): boolean {
    const newPassword = this.UserUpdateForm.get('newPassword')?.value;
    const newPasswordRepeat = this.UserUpdateForm.get('newPasswordRepeat')?.value;
    let bool:boolean = false;
  
    // Eğer yeni şifre alanları boş ise, kontrol geçilecek (şifre güncellenmeyecek)
    if (!newPassword && !newPasswordRepeat) {
      bool = false;
    }
    else if(newPassword != newPasswordRepeat){
      bool = true;
    }
    // Yeni şifre alanları doluysa, şifrelerin eşleşip eşleşmediğini kontrol ediyoruz

  
    return bool;
  }
} 
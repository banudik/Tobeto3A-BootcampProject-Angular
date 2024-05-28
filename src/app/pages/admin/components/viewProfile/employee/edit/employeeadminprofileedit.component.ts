import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdEmployeeResponse } from '../../../../../../features/models/responses/employee/get-by-id-employee-response';
import { EmployeeService } from '../../../../../../features/services/concretes/employee.service';
import { formatDate } from '../../../../../../core/helpers/format-date';
import { UpdateEmployeeRequest } from '../../../../../../features/models/requests/employee/update-employee-request';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../../core/helpers/validationtoastrmessagehelper';
import { UserForLoginRequest } from '../../../../../../features/models/requests/auth/user-for-login-request';
import { AuthService } from '../../../../../../features/services/concretes/auth.service';
import { LocalStorageService } from '../../../../../../features/services/concretes/local-storage.service';
import { DeletedEmployeeResponse } from '../../../../../../features/models/responses/employee/deleted-employee-response';

@Component({
  selector: 'app-employeeadminprofileedit',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employeeadminprofileedit.component.html',
  styleUrl: './employeeadminprofileedit.component.css'
})
export class EmployeeadminprofileeditComponent   implements OnInit {
  currentUser!: GetByIdEmployeeResponse;
  UserUpdateForm!: FormGroup
  userLoginRequest!: UserForLoginRequest;
  showDeleteModal:boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getUserById(params["employeeId"])
    })
  }

  constructor(private employeeService: EmployeeService,
    private router: Router, private change: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService,private validationHelper: ValidationHelper, private toastr: ToastrService,private storageService:LocalStorageService
  ) { }

  getUserById(id: string) {
    this.employeeService.getEmployeeById(id).subscribe(
      (response: GetByIdEmployeeResponse) => {
        this.currentUser = response;
        this.createUpdateForm();
        this.loadCurrentUser();
      },
      (error: any) => {
        console.error('Error fetching instructor:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(() => {
          this.router.navigate(['/adminpanel/'])
        }, 2000)
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
      position: ["",Validators.required],
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
      position: this.currentUser.position,
      email: this.currentUser.email,
      dateOfBirth: formatDate(this.currentUser.dateOfBirth.toString()),
      nationalIdentity: this.currentUser.nationalIdentity,
    });
  }

  update() {
    if (this.UserUpdateForm.valid) {
      let userModel: UpdateEmployeeRequest = Object.assign({}, this.UserUpdateForm.value);
      this.employeeService.update(userModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          this.toastr.success("User updated Successfully!");
          (response.id)
        },
        error: (error) => {
          this.toastr.error("failde to update: "+ error.message);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("User updated Successfully!");

          if(userModel.password != null){
            this.removeAndSetNewToken(userModel.email,userModel.password,userModel.newPassword);
          }
          this.UserUpdateForm.reset();
          this.change.markForCheck();
          setTimeout(() => {
            this.router.navigate(['/adminpanel/'])
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


  removeAndSetNewToken(email:string,password:string,newPassword?:string){


    if(newPassword != null){
      password = newPassword;
    }

    this.userLoginRequest.email = email;
    this.userLoginRequest.password = password;

    this.authService.login(this.userLoginRequest).subscribe({
      next: (response) => {
        if (response.accessToken) {
          this.storageService.removeToken();
          localStorage.setItem('token', response.accessToken.token);
          this.change.detectChanges();
        } 
      },
      error: (error) => {
        this.toastr.error("Login Failed");
      },
      complete: () => {}
    });
  }

  deleteAccount(id:string){
    this.employeeService.delete(id).subscribe(
      (response: DeletedEmployeeResponse) => {
        this.storageService.removeToken();
        this.router.navigate(['login'])
      },
      (error: any) => {
        console.error('Error fetching Employee:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel'])
        },1)
      }
    );
  }
}

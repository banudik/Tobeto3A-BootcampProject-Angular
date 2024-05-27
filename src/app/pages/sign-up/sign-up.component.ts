import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../features/services/concretes/local-storage.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../core/helpers/validationtoastrmessagehelper';
import { DarkModeService } from '../../features/services/dark-mode.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  password: string = '';
  validations = [
    { condition: this.password.length >= 8, message: 'It must be at least 8 characters.' },
    { condition: /[a-z]/.test(this.password), message: 'It must contain at least one lowercase letter.' },
    { condition: /[A-Z]/.test(this.password), message: 'It must contain at least one uppercase letter.' },
    { condition: /\d/.test(this.password), message: 'It must contain at least one digit.' },
    { condition: /[!@#$%^&*(),.?":{}|<>]/.test(this.password), message: 'It must contain at least one special character.' }
  ];
  private readonly apiUrl: string = `${environment.API_URL}/`

  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;

  currentStep = 1;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createStepForms();
    window.scrollTo(0,0);
  }

  createStepForms() {
    this.step1Form = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.step2Form = this.formBuilder.group({
      about: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });

    this.step3Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/.*[A-Z].*/), // Büyük harf
        Validators.pattern(/.*[a-z].*/), // küçük harf
        Validators.pattern(/.*[0-9].*/), // sayı
        Validators.pattern(/.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+.*/) // özel karakter
      ]],
      termsAgreement: [false, Validators.requiredTrue]
    });
  }

  nextStep() {
    let nextStepIsValid = false;
    if (this.currentStep === 1) {
      nextStepIsValid = this.step1Form.valid;
    } else if (this.currentStep === 2) {
      nextStepIsValid = this.step2Form.valid;
    }
    if (nextStepIsValid) {
      this.currentStep++;
    } else {
      this.toastr.warning('Please fill in all required fields for the current step.', 'Warning');
    }
  }

  prevStep() {
    this.currentStep--;
  }

  submitForm() {
    const termsAgreement = this.step3Form.get('termsAgreement')?.value;
    const email = this.step3Form.get('email')?.value;
    const password = this.step3Form.get('password')?.value;
  
    if (!termsAgreement || !email || !password) {
      if (!termsAgreement) {
        this.toastr.warning('Please accept the Terms of Use and Privacy Policy.', 'Warning');
      }
  
      if (!email || !password) {
        this.toastr.warning('Please fill in all required fields for all steps.', 'Warning');
      }
  
      return; // Terms of Use, Privacy Policy veya diğer alanlar eksikse işlemi burada sonlandır
    }
  
    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid) {
      const registerModel = {
        ...this.step1Form.value,
        ...this.step2Form.value,
        ...this.step3Form.value
      };
      this.authService.registerApplicant(registerModel).subscribe(response => {
        this.toastr.success('Registration successful!');
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1000);
      }, errorResponse => {
        errorResponse.error.Errors.forEach((error: any) => {
          error.Errors.forEach((errorMessage: string) => {
            alert(`Error: ${errorMessage}`);
          });
        });
      });
    }
  }
  
  validatePassword() {
    const passwordControl = this.step3Form.get('password');
    const newPasswordValue = passwordControl?.value;

    this.validations[0].condition = newPasswordValue.length >= 8;
    this.validations[1].condition = /[a-z]/.test(newPasswordValue);
    this.validations[2].condition = /[A-Z]/.test(newPasswordValue);
    this.validations[3].condition = /\d/.test(newPasswordValue);
    this.validations[4].condition = /[!@#$%^&*(),.?":{}|<>]/.test(newPasswordValue);
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    return control?.invalid && (control.dirty || control.touched);
  }
  
  darkModeService: DarkModeService = inject(DarkModeService);
}
  
 
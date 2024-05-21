import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { GetByIdInstructorResponse } from '../../../../../features/models/responses/instructor/get-by-id-instructor-response';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { UpdateInstructorRequest } from '../../../../../features/models/requests/instructor/update-instructor-request';
import { AuthService } from '../../../../../features/services/concretes/auth.service';

@Component({
  selector: 'app-instructoredit',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './instructoredit.component.html',
  styleUrl: './instructoredit.component.css'
})
export class InstructoreditComponent implements OnInit {
  currentInstructor!: GetByIdInstructorResponse;
  InstructorUpdateForm!: FormGroup
  formMessage: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      this.getInstructorById(params["instructorId"])
    })
  }

  constructor(private instructorService: InstructorService,
    private router: Router, private change: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService
  ) { }

  getInstructorById(id: string) {
    this.instructorService.getInstructorById(id).subscribe(
      (response: GetByIdInstructorResponse) => {
        this.currentInstructor = response;
        this.createRegisterForm();
        this.loadCurrentInstructor();
      },
      (error: any) => {
        console.error('Error fetching instructor:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(() => {
          this.router.navigate(['/adminpanel/instructorindex'])
        }, 2000)
      }
    );

  }

  createRegisterForm() {
    this.InstructorUpdateForm = this.formBuilder.group({
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
      companyName: ["", Validators.required],
      description: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      userName: ["", Validators.required],
      nationalIdentity: ["", Validators.required]
    })
  }

  loadCurrentInstructor() {
    // currentInstructor verilerinizi burada yükleyin. Örneğin:

    this.InstructorUpdateForm.patchValue({
      id: this.currentInstructor.id,
      firstName: this.currentInstructor.firstName,
      lastName: this.currentInstructor.lastName,
      userName: this.currentInstructor.userName,
      email: this.currentInstructor.email,
      description: this.currentInstructor.description,
      dateOfBirth: this.currentInstructor.dateOfBirth,
      nationalIdentity: this.currentInstructor.nationalIdentity,
      companyName: this.currentInstructor.companyName
    });
  }

  update() {
    if (this.InstructorUpdateForm.valid) {
      let instructorModel: UpdateInstructorRequest = Object.assign({}, this.InstructorUpdateForm.value);
      this.instructorService.update(instructorModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          console.log("Instructor Updated");
          (response.id)
        },
        error: (error) => {
          this.formMessage = "güncellenemedi";
          this.change.markForCheck();
        },
        complete: () => {
          this.formMessage = "Başarıyla Güncellendi";
          this.InstructorUpdateForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/instructorindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {
    const nameControl = this.InstructorUpdateForm.get('firstName');

    // Geçersiz olan kontrolleri konsola yazdır
    Object.keys(this.InstructorUpdateForm.controls).forEach(key => {
      const controlErrors = this.InstructorUpdateForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log(key + ' has errors: ', controlErrors);
      }
    });

    if (nameControl && nameControl.invalid) {
      this.formMessage = "Lütfen gerekli alanları doldurun";
      return;
    }
    if (this.checkIfInstructor()) {
      return;
    }

    this.update();
  }

  checkIfInstructor(): boolean {
    if (this.authService.isInstructor()) {
      if (this.currentInstructor.id != this.authService.getCurrentUserId()) {
        this.formMessage = "You can not edit other instructors!";
        setTimeout(() => {
          this.router.navigate(['/adminpanel/instructorindex'])
        }, 2000)
        return true;
      }
    }
    return false;
  }
}

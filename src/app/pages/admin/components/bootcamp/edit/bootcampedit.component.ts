import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UpdateBootcampRequest } from '../../../../../features/models/requests/bootcamp/update-bootcamp-request';
import { GetByIdBootcampResponse } from '../../../../../features/models/responses/bootcamp/get-by-id-bootcamp-response';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service';
import { BootcampStateListItemDto } from '../../../../../features/models/responses/bootcamp-state/bootcampstate-list-item-dto';
import { InstructorListItemDto } from '../../../../../features/models/responses/instructor/instructor-list-item-dto';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { formatDate } from '../../../../../core/helpers/format-date';

@Component({
  selector: 'app-bootcampedit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './bootcampedit.component.html',
  styleUrl: './bootcampedit.component.css'
})
export class BootcampeditComponent implements OnInit {

  currentBootcamp!: GetByIdBootcampResponse;
  BootcampUpdateForm!: FormGroup
  instructors!: InstructorListItemDto;
  bootcampStates!: BootcampStateListItemDto;

  ngOnInit(): void {
    this.getInstructors();
    this.getBootcampStates();
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getBootcampById(params["bootcampId"])
    })

  }

  constructor(private formBuilder: FormBuilder, private bootcampService: BootcampService,
    private router: Router, private change: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private bootcampStateService: BootcampStateService
    , private instructorService: InstructorService, private authService: AuthService, private toastr: ToastrService,private validationHelper: ValidationHelper
  ) { }

  getInstructors() {
    this.instructorService.GetListAll().subscribe((response) => {
      this.instructors = response;
    })
  }

  getBootcampStates() {
    this.bootcampStateService.getList({ pageIndex: 0, pageSize: 100000 }).subscribe((response) => {
      this.bootcampStates = response;
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.BootcampUpdateForm?.get('file')?.setValue(file);
    console.log(this.BootcampUpdateForm.value.file);
  }

  createForm() {
    this.BootcampUpdateForm = this.formBuilder.group({
      id: ["",[Validators.required]],
      name: ["",[Validators.required]],
      instructorId: ["",[Validators.required]],
      startDate: ["",[Validators.required]],
      endDate: ["",[Validators.required]],
      file: [],
      description: ["",[Validators.required]],
      bootcampStateId: ["",[Validators.required]],
    })
  }

  getBootcampById(id: number) {
    this.bootcampService.getBootcampById(id).subscribe(
      (response: GetByIdBootcampResponse) => {
        this.currentBootcamp = response;
        this.createForm();
        this.loadCurrentBootcamp();
      },
      (error: any) => {
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        this.toastr.error( "bootcamp could not be found!");
        setTimeout(() => {
          this.router.navigate(['/adminpanel/bootcampindex'])
        }, 2000)
      }
    );

  }

  loadCurrentBootcamp() {
    // currentInstructor verilerinizi burada yükleyin. Örneğin:

    this.BootcampUpdateForm.patchValue({
      id: this.currentBootcamp.id,
      name: this.currentBootcamp.name,
      instructorId: this.currentBootcamp.instructorId,
      startDate: formatDate( this.currentBootcamp.startDate.toString()),
      endDate: formatDate(this.currentBootcamp.endDate.toString()),
      description: this.currentBootcamp.description,
      bootcampStateId: this.currentBootcamp.bootcampStateId,
    });
  }

  update() {
    if (this.BootcampUpdateForm.valid) {
      let bootcampModel: UpdateBootcampRequest = Object.assign({}, this.BootcampUpdateForm.value);

      let formData = new FormData();
      formData.append('id', bootcampModel.id.toString());
      formData.append('name', bootcampModel.name);
      formData.append('instructorId', bootcampModel.instructorId);
      formData.append('startDate', bootcampModel.startDate.toString());
      formData.append('endDate', bootcampModel.endDate.toString());
      formData.append('file', bootcampModel.file,);
      formData.append('description', bootcampModel.description);
      formData.append('bootcampStateId', bootcampModel.bootcampStateId.toString());




      this.bootcampService.update(formData).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          this.toastr.success(response.name + " Updated Successfully!");
        },
        error: (error) => {
          this.toastr.error("failed to update");
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Updated Successfully!");
          this.BootcampUpdateForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/bootcampindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {
    this.validationHelper.checkValidation(this.BootcampUpdateForm);

    // Object.keys(this.BootcampUpdateForm.controls).forEach(key => {
    //   const controlErrors = this.BootcampUpdateForm.get(key)?.errors;
    //   if (controlErrors != null) {
    //     const errorMessages = Object.keys(controlErrors).map(errorKey => {
    //       switch (errorKey) {
    //         case 'required':
    //           return 'This field is required';
    //         case 'minlength':
    //           return `Minimum length is ${controlErrors[errorKey].requiredLength}`;
    //         case 'maxlength':
    //           return `Maximum length is ${controlErrors[errorKey].requiredLength}`;
    //         // Diğer hata türlerini buraya ekleyin
    //         default:
    //           return `Unknown error: ${errorKey}`;
    //       }
    //     }).join(', ');
    //     this.toastr.warning(key + ' field has errors: ' + errorMessages);
    //   }
    // });
    

    if (this.BootcampUpdateForm.invalid) {
      this.toastr.error("Lütfen gerekli alanları doldurun");
      return;
    }
    if (this.checkIfInstructor()) {
      return;
    }


    this.update();
  }

  checkIfInstructor(): boolean {
    if (this.authService.isInstructor()) {
      if (this.currentBootcamp.instructorId != this.authService.getCurrentUserId()) {
        this.toastr.error("You can not edit other instructor's bootcamp!");
        setTimeout(() => {
          this.router.navigate(['/adminpanel/bootcampindex'])
        }, 2000)
        return true;
      }
    }
    return false;
  }
}

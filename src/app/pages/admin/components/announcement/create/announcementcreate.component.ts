import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../../../features/services/concretes/announcement.service';
import { CreateAnnouncementRequest } from '../../../../../features/models/requests/announcement/create-announcement-request';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';

@Component({
  selector: 'app-announcementcreate',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './announcementcreate.component.html',
  styleUrl: './announcementcreate.component.css'
})
export class AnnouncementcreateComponent implements OnInit {

  announcementForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private announcementService: AnnouncementService,
    private router: Router, private httpClient: HttpClient, private change: ChangeDetectorRef, private toastr: ToastrService, private validationHelper: ValidationHelper) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.announcementForm = this.formBuilder.group({
      header: ["", Validators.required],
      description: ["", Validators.required],
    })
  }


  add() {
    if (this.announcementForm.valid) {
      let announcementModel: CreateAnnouncementRequest = Object.assign({}, this.announcementForm.value);
      this.announcementService.add(announcementModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
        },
        error: (error) => {
          this.toastr.error("Announcement could not be created!");
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Announcement successfully added!");
          this.announcementForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/announcementindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {

    this.validationHelper.checkValidation(this.announcementForm);
    if (this.announcementForm.invalid) {
      this.toastr.error("invalid inputs");
      return;
    }

    this.add();
  }

}

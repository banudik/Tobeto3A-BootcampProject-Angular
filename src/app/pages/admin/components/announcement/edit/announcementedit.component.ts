import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdAnnouncementResponse } from '../../../../../features/models/responses/announcement/get-by-id-announcement-response';
import { AnnouncementService } from '../../../../../features/services/concretes/announcement.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateAnnouncementRequest } from '../../../../../features/models/requests/announcement/update-announcement-request';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';

@Component({
  selector: 'app-announcementedit',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './announcementedit.component.html',
  styleUrl: './announcementedit.component.css'
})
export class AnnouncementeditComponent implements OnInit{
  currentAnnouncement!:GetByIdAnnouncementResponse;
  AnnouncementUpdateForm!: FormGroup
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getAnnouncementById(params["announcementId"])
  })
  }

  constructor(private announcementService:AnnouncementService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private toastr:ToastrService,private validationHelper: ValidationHelper, private formBuilder: FormBuilder
  ){}

  getAnnouncementById(id:number){
    this.announcementService.getByAnoouncementId(id).subscribe(
      (response: GetByIdAnnouncementResponse) => {
        this.currentAnnouncement = response;
        this.createUpdateForm();
        this.loadCurrentAnnouncement();
        
      },
      (error: any) => {
        this.toastr.error('Error fetching Announcement:', error)
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/announcementindex'])
        },2000)
      }
    );

  }
  createUpdateForm() {
    this.AnnouncementUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      header: ["", Validators.required],
      description: ["", Validators.required],

    })
  }

  loadCurrentAnnouncement() {
    // currentInstructor verilerinizi burada yükleyin. Örneğin:

    this.AnnouncementUpdateForm.patchValue({
      id: this.currentAnnouncement.id,
      header: this.currentAnnouncement.header,
      description: this.currentAnnouncement.description,

    });
  }

  update() {
    if (this.AnnouncementUpdateForm.valid) {
      let announcementModel: UpdateAnnouncementRequest = Object.assign({}, this.AnnouncementUpdateForm.value);
      this.announcementService.update(announcementModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          //this.toastr.success("Announcement updated Successfully!");
          //(response.id)
        },
        error: (error) => {
          this.toastr.error("failde to update: "+ error.message);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Announcement updated Successfully!");
          this.AnnouncementUpdateForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/announcementindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {


    this.validationHelper.checkValidation(this.AnnouncementUpdateForm);

    if (this.AnnouncementUpdateForm.invalid) {
      this.toastr.error("Invalid inputs!");
      return;
    }

    this.update();
  }
}

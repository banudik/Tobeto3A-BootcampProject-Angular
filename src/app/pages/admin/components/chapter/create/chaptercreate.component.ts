import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { ChapterService } from '../../../../../features/services/concretes/chapter.service';
import { CreateChapterRequest } from '../../../../../features/models/requests/chapter/create-chapter-request';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { GetListBootcampResponse } from '../../../../../features/models/responses/bootcamp/get-list-bootcamp-response';

@Component({
  selector: 'app-chaptercreate',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './chaptercreate.component.html',
  styleUrl: './chaptercreate.component.css'
})
export class ChaptercreateComponent  implements OnInit {
  isloading:boolean = true;
  chapterForm!: FormGroup;
  bootcamps!:GetListBootcampResponse[];

  constructor(private formBuilder: FormBuilder, private chapterService: ChapterService,
    private router: Router, private bootcampService: BootcampService, private change: ChangeDetectorRef, private toastr: ToastrService, private validationHelper: ValidationHelper) { }

  ngOnInit(): void {
    this.getBootcamps();
    this.createChapterForm();
  }

  createChapterForm() {
    this.isloading = true;
    this.chapterForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      link: ["", Validators.required],
      bootcampId: ["", Validators.required],
      time: ["", Validators.required],
      sort: ["", Validators.required]
    })
    this.isloading = false;
  }

  getBootcamps(){
    this.isloading = true;
    this.bootcampService.getList({ pageIndex: 0, pageSize: 100000}).subscribe((response)=>{
     this.bootcamps=response.items;
     this.isloading = false;
    })
 }


  add() {
    if (this.chapterForm.valid) {
      let chapterModel: CreateChapterRequest = Object.assign({}, this.chapterForm.value);
      this.chapterService.add(chapterModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
        },
        error: (error) => {
          this.toastr.error("Chapter could not be created!");
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Chapter successfully added!");
          this.chapterForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/chapterindex'])
          }, 2000)
        }
      })
    }
    else{
      this.toastr.error("Chapter form is invalid!");
    }

  }

  onFormSubmit() {

    this.validationHelper.checkValidation(this.chapterForm)

    if (this.chapterForm.invalid) {
      this.toastr.error("Invalid inputs!");
      return;
    }

    this.add();
  }

}

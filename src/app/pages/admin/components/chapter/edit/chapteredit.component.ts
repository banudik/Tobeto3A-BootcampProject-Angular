import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdChapterResponse } from '../../../../../features/models/responses/chapter/get-by-id-chapter-response';
import { ChapterService } from '../../../../../features/services/concretes/chapter.service';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { UpdateChapterRequest } from '../../../../../features/models/requests/chapter/update-chapter-request';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { GetListBootcampResponse } from '../../../../../features/models/responses/bootcamp/get-list-bootcamp-response';

@Component({
  selector: 'app-chapteredit',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './chapteredit.component.html',
  styleUrl: './chapteredit.component.css'
})
export class ChaptereditComponent implements OnInit{
  currentChapter!:GetByIdChapterResponse;
  ChapterUpdateForm!: FormGroup;
  isloading:boolean = true;
  bootcamps!:GetListBootcampResponse[];
  
  ngOnInit(): void {
    this.getBootcamps();
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getChapterById(params["chapterId"])
  })
  }

  constructor(private chapterService:ChapterService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private toastr:ToastrService,private validationHelper: ValidationHelper, private formBuilder: FormBuilder,private bootcampService:BootcampService
  ){}

  getChapterById(id:number){
    this.chapterService.getByChapterId(id).subscribe(
      (response: GetByIdChapterResponse) => {
        this.currentChapter = response;
        this.createUpdateForm();
        this.loadCurrentChapter();
      },
      (error: any) => {
        this.toastr.error('Error fetching Chapter:', error)
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/chapterindex'])
        },2000)
      }
    );

  }

  getBootcamps(){
    this.isloading = true;
    this.bootcampService.getList({ pageIndex: 0, pageSize: 100000}).subscribe((response)=>{
     this.bootcamps=response.items;
     this.isloading = false;
    })
 }

  createUpdateForm() {
    this.ChapterUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      time: ["", Validators.required],
      link: ["", Validators.required],
      bootcampId: ["", Validators.required],
      sort: ["", Validators.required],

    })
  }

  loadCurrentChapter() {
    // verilerinizi burada yükleyin. Örneğin:

    this.ChapterUpdateForm.patchValue({
      id: this.currentChapter.id,
      title: this.currentChapter.title,
      description: this.currentChapter.description,
      time: this.currentChapter.time,
      link: this.currentChapter.link,
      bootcampId: this.currentChapter.bootcampId,
      sort: this.currentChapter.sort

    });
  }

  update() {
    if (this.ChapterUpdateForm.valid) {
      let chapterModel: UpdateChapterRequest = Object.assign({}, this.ChapterUpdateForm.value);
      this.chapterService.update(chapterModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          this.toastr.success("Chapter updated Successfully!");
          (response.id)
        },
        error: (error) => {
          this.toastr.error("failde to update: "+ error.message);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Chapter updated Successfully!");
          this.ChapterUpdateForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/chapterindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {
    this.validationHelper.checkValidation(this.ChapterUpdateForm);

    if (this.ChapterUpdateForm.invalid) {
      this.toastr.error("invalid inputs! ");
      return;
    }

    this.update();
  }
}

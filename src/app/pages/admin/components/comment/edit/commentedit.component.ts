import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetByIdCommentResponse } from '../../../../../features/models/responses/comment/get-by-id-comment-response';
import { UpdateCommentRequest } from '../../../../../features/models/requests/comment/update-comment-request';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationHelper } from '../../../../../core/helpers/validationtoastrmessagehelper';
import { CommentService } from '../../../../../features/services/concretes/comment.service';
import { formatDate } from '../../../../../core/helpers/format-date';

@Component({
  selector: 'app-commentedit',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './commentedit.component.html',
  styleUrl: './commentedit.component.css'
})
export class CommenteditComponent  implements OnInit{
  currentComment!:GetByIdCommentResponse;
  CommentUpdateForm!: FormGroup;
  isloading:boolean = true;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getCommentById(params["commentId"])
  })
  }

  constructor(private commentService:CommentService,
    private router:Router,private change:ChangeDetectorRef, private activatedRoute:ActivatedRoute, private toastr:ToastrService,private validationHelper: ValidationHelper, private formBuilder: FormBuilder
  ){}

  getCommentById(id:number){
    this.commentService.getByCommentId(id).subscribe(
      (response: GetByIdCommentResponse) => {
        this.currentComment = response;
        this.createUpdateForm();
        this.loadCurrentChapter();
      },
      (error: any) => {
        this.toastr.error('Error fetching Comment:', error)
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/commentindex'])
        },2000)
      }
    );

  }

  createUpdateForm() {
    this.CommentUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      status: ["", Validators.required],

      // context: ["", Validators.required],
      // chapterBootcampName: ["", Validators.required],
      // userFirstName: ["", Validators.required],
      // userLastName: ["", Validators.required],
      // userEmail: ["", Validators.required],
      // createdDate:["", Validators.required]

    })
  }

  loadCurrentChapter() {
    // verilerinizi burada yükleyin. Örneğin:

    this.CommentUpdateForm.patchValue({
      id: this.currentComment.id,
      status: this.currentComment.status,

      // context: this.currentComment.context,
      // chapterBootcampName: this.currentComment.chapterBootcampName,
      // userFirstName: this.currentComment.userFirstName,
      // userLastName: this.currentComment.userLastName,
      // userEmail: this.currentComment.userEmail,
      // createdDate: this.currentComment.createdDate

    });
    this.isloading = false;
  }

  update() {
    if (this.CommentUpdateForm.valid) {
      let commentModel: UpdateCommentRequest = Object.assign({}, this.CommentUpdateForm.value);
      this.commentService.update(commentModel).subscribe({
        //next => observable'dan gelen veri yakaladığımız fonksiyon
        next: (response) => {
          //this.toastr.success("Comment updated Successfully!");
          //(response.status)
        },
        error: (error) => {
          this.toastr.error("failde to update: "+ error.message);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Comment updated Successfully!");
          this.CommentUpdateForm.reset();
          this.change.markForCheck();

          setTimeout(() => {
            this.router.navigate(['/adminpanel/commentindex'])
          }, 2000)
        }
      })
    }
  }

  onFormSubmit() {

    this.validationHelper.checkValidation(this.CommentUpdateForm);

    if (this.CommentUpdateForm.invalid) {
      this.toastr.error("invalid inputs! ");
      return;
    }

    this.update();
  }
}

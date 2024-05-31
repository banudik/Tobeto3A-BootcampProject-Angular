import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetByIdCommentResponse } from '../../../../../features/models/responses/comment/get-by-id-comment-response';
import { CommentService } from '../../../../../features/services/concretes/comment.service';
import { DeletedCommentResponse } from '../../../../../features/models/responses/comment/deleted-comment-respones';

@Component({
  selector: 'app-commentdelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './commentdelete.component.html',
  styleUrl: './commentdelete.component.css'
})
export class CommentdeleteComponent    implements OnInit{
  currentComment!:GetByIdCommentResponse;
  isloading:boolean = true;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getCommentById(params["commentId"])
  })
  }

  constructor(private commentService:CommentService,
    private router:Router,private activatedRoute:ActivatedRoute, private toastr:ToastrService
  ){}

  getCommentById(id:number){
    this.commentService.getByCommentId(id).subscribe(
      (response: GetByIdCommentResponse) => {
        this.currentComment = response;
        this.isloading = false;
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

  deleteChapter(id:number){
    this.commentService.delete(id).subscribe(
      (response: DeletedCommentResponse) => {
        this.toastr.success("Comment Deleted Successfully");
        this.router.navigate(['/adminpanel/commentindex'])
      },
      (error: any) => {
        this.toastr.error('Error fetching Comment:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/commentindex'])
        },1)
      }
    );
  }
}


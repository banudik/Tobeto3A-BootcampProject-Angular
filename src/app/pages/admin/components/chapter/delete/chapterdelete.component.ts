import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetByIdChapterResponse } from '../../../../../features/models/responses/chapter/get-by-id-chapter-response';
import { ChapterService } from '../../../../../features/services/concretes/chapter.service';
import { DeletedChapterResponse } from '../../../../../features/models/responses/chapter/deleted-chapter-response';

@Component({
  selector: 'app-chapterdelete',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './chapterdelete.component.html',
  styleUrl: './chapterdelete.component.css'
})
export class ChapterdeleteComponent  implements OnInit{
  currentChapter!:GetByIdChapterResponse;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      this.getChapterById(params["chapterId"])
  })
  }

  constructor(private chapterService:ChapterService,
    private router:Router, private activatedRoute:ActivatedRoute, private toastr:ToastrService
  ){}

  getChapterById(id:number){
    this.chapterService.getByChapterId(id).subscribe(
      (response: GetByIdChapterResponse) => {
        this.currentChapter = response;
        
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

  deleteChapter(id:number){
    this.chapterService.delete(id).subscribe(
      (response: DeletedChapterResponse) => {
        this.toastr.success("Chapter Deleted Successfully");
        this.router.navigate(['/adminpanel/chapterindex'])
      },
      (error: any) => {
        this.toastr.error('Error fetching Chapter:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        setTimeout(()=>{
          this.router.navigate(['/adminpanel/chapterindex'])
        },1)
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { GetByIdChapterResponse } from '../../../../../features/models/responses/chapter/get-by-id-chapter-response';
import { ChapterService } from '../../../../../features/services/concretes/chapter.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chapterdetails',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './chapterdetails.component.html',
  styleUrl: './chapterdetails.component.css'
})
export class ChapterdetailsComponent implements OnInit{
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
}
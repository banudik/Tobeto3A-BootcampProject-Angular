import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { GetByIdBootcampResponse } from '../../../models/responses/bootcamp/get-by-id-bootcamp-response';
import { HttpClientModule } from '@angular/common/http';
import { BootcampListGroupComponent } from '../bootcamp-list-group/bootcamp-list-group.component';
import { ApplicationInformationService } from '../../../services/concretes/application-information.service';
import { CreateApplicationInformationRequest } from '../../../models/requests/application-information/create-application-information-request';
import { CreatedApplicationInformationResponse } from '../../../models/responses/application-information/created-application-information-response';
import { LocalStorageService } from '../../../services/concretes/local-storage.service';
import { AuthService } from '../../../services/concretes/auth.service';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommentService } from '../../../services/concretes/comment.service';
import { CommentListItemDto } from '../../../models/responses/comment/comment-list-item-dto';
import { GetListCommentResponse } from '../../../models/responses/comment/get-list-comment-response';
import { PageRequest } from '../../../../core/models/page-request';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCommentRequest } from '../../../models/requests/comment/create-comment-request';
import { CreatedCommentResponse } from '../../../models/responses/comment/created-comment-response';
import { ChapterService } from '../../../services/concretes/chapter.service';
import { ChapterListItemDto } from '../../../models/responses/chapter/chapter-list-item-dto';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bootcamp-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, BootcampListGroupComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './bootcamp-details.component.html',
  styleUrl: './bootcamp-details.component.css'
})
export class BootcampDetailsComponent implements OnInit {


  getByIdBootcampResponse !: GetByIdBootcampResponse
  currentPageNumber!: number;
  commentList!: CommentListItemDto;
  commentIndex: number = 0;
  chapterIndex:number = 0;
  isloading: boolean = true;
  commentForm!: FormGroup;
  totallength!:number;
  chapterList!:ChapterListItemDto;
  chapterCount!:number;
  // activatedRoute: any;
  // bootcampService: any;

  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute
    , private applicationInformationService: ApplicationInformationService, private localStorageService: LocalStorageService
    ,private fb: FormBuilder,private router:Router,
    private authService: AuthService, private renderer2: Renderer2, private commentService: CommentService,private ChapterService:ChapterService,
    private toastr:ToastrService,

    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      if (params["bootcampId"]) {
        this.getBootcampById(params["bootcampId"])
      } else { console.log("getById bootcamp error") }
    })
    window.scrollTo(0, 0);
    // Ana JS dosyalarını yükleme
    this.loadScript('assets/homepageAssets/js/jquery.min.js');
    this.loadScript('assets/homepageAssets/js/bootstrap.min.js');
    this.loadScript('assets/homepageAssets/js/magnific-popup.min.js');
    this.loadScript('assets/homepageAssets/js/nice-select.min.js');
    this.loadScript('assets/homepageAssets/js/jquery.mixitup.min.js');
    this.loadScript('assets/homepageAssets/js/appear.min.js');
    this.loadScript('assets/homepageAssets/js/sticky-sidebar.min.js');
    this.loadScript('assets/homepageAssets/js/odometer.min.js');
    this.loadScript('assets/homepageAssets/js/owl.carousel.min.js');
    this.loadScript('assets/homepageAssets/js/meanmenu.min.js');
    this.loadScript('assets/homepageAssets/js/wow.min.js');
    this.loadScript('assets/homepageAssets/js/main.js');

     // Yorum formunu oluşturma
     this.commentForm = this.fb.group({
      content: ['', Validators.required],
      status: false,
    });
  }
  private loadScript(url: string) {
    const script = this.renderer2.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    this.renderer2.appendChild(this._document.body, script);
  }

  getBootcampById(bootcampId: number): void {
    this.bootcampService.getBootcampById(bootcampId).subscribe(
      (response: GetByIdBootcampResponse) => {
        this.getByIdBootcampResponse = response;
        this.getChapters({pageIndex:this.chapterIndex,pageSize: 10})
        this.getComments({ pageIndex: this.commentIndex, pageSize: 5 });
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        console.log("getBootcampById error");
      }
    );
  }
  


  getComments(pageRequest: PageRequest) {
    //{pageIndex:this.commentIndex , pageSize:10}
    this.isloading = true;
    this.commentService.getListByBootcampId(pageRequest, this.getByIdBootcampResponse.id).subscribe(
      (response: CommentListItemDto) => {
        this.commentList = response;
        this.isloading = false;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        console.log("getBootcampById error");
      }
    );
  }

  getChapters(pageRequest:PageRequest){
    this.isloading = true;
    this.ChapterService.getListByBootcampId(this.getByIdBootcampResponse.id,pageRequest ).subscribe(
      (response: ChapterListItemDto) => {
        this.chapterList = response;
        this.isloading = false;
        this.getTotalLength();
        this.getChapterCount();
      },
      (error: any) => {
        console.error('Error fetching chapters:', error);
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
        console.log("getListChapter error");
      }
    );
  }

  nextCommentPage() {
    this.commentIndex++;
    this.getComments({ pageIndex: this.commentIndex, pageSize: 5 });
  }

  PreviousCommentPage() {
    this.commentIndex--;
    this.getComments({ pageIndex: this.commentIndex, pageSize: 5 });
  }

  pageNumbers() {
    let pageNumbers = new Array(this.commentList.pages);
    return pageNumbers;
  }

  changePage(pageNumber: number) {
    this.commentIndex = pageNumber;

    this.getComments({ pageIndex: this.commentIndex, pageSize: 5 });
  }
  isExpired(endDate: Date): boolean {     return new Date(endDate) < new Date(); }// endDate, geçmiş bir tarihe sahipse true döndürür   
  // addApplication metodu
  addApplication() {
    // CreateApplicationInformationRequest nesnesi oluşturma
    //const token = this.authService.getDecodedToken();
    // console.log(token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    
    if(!this.authService.isApplicant()){
      this.toastr.warning("You must login before applying!");
      this.router.navigate(['/login'])
    }

    const createApplicationRequest: CreateApplicationInformationRequest = {
      bootcampId: this.getByIdBootcampResponse.id,
      applicantId: this.authService.getCurrentUserId(),
      ApplicationStateInformationId: 1 // default olarak 1 değeri atanıyor
    };

    // Servis çağrısı ve abonelik
    this.applicationInformationService.addApplication(createApplicationRequest).subscribe((response: any) => {
      if(response){
        this.toastr.success("Application successfull");
      }
    });
  }


  // Yorum ekleme metodu
  addComment(): void {
    if (this.commentForm.valid) {
      const token = this.authService.getDecodedToken();
      const createCommentRequest: CreateCommentRequest = {
        context: this.commentForm.value.content,
        bootcampId: this.getByIdBootcampResponse.id,
        userId: token['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
      };

      this.commentService.add(createCommentRequest).subscribe(
        (response: CreatedCommentResponse) => {
          if (response) {
            console.log('Comment added successfully', response);
            this.commentForm.reset();
            this.getComments({ pageIndex: this.commentIndex, pageSize: 5 });
          } else {
            console.error('Failed to add comment', response);
          }
        },
        (error) => {
          console.error('Error adding comment', error);
        }
      );
    }
  }

  getTotalLength() {
    this.totallength = this.chapterList.items.reduce((total, chapter) => total + chapter.time, 0);
  }

  getChapterCount(): number {
    return this.chapterList.items.length;
  }

  onViewMoreClicked(): void {
    const nextPageIndex = this.chapterList.index + 1;
    this.updateCurrentPageNumber();
    this.getChapters({ pageIndex: nextPageIndex, pageSize: 10 });
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.chapterList.index - 1;
    this.lowerCurrentPageNumber();
    this.getChapters({ pageIndex: previousPageIndex, pageSize: 10 });
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.chapterList.index + 1;
  }

  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.chapterList.index - 1;

  }
}

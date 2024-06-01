import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ChapterService } from '../../features/services/concretes/chapter.service';
import { UserService } from '../../features/services/concretes/user.service';
import { AuthService } from '../../features/services/concretes/auth.service';
import { GetByIdUserResponse } from '../../features/models/responses/users/get-by-id-user-response';
import { GetByIdChapterResponse } from '../../features/models/responses/chapter/get-by-id-chapter-response';
import { GetByIdBootcampResponse } from '../../features/models/responses/bootcamp/get-by-id-bootcamp-response';
import { GetByIdInstructorResponse } from '../../features/models/responses/instructor/get-by-id-instructor-response';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetListChapterResponse } from '../../features/models/responses/chapter/get-list-chapter-response';
import { ChapterListItemDto } from '../../features/models/responses/chapter/chapter-list-item-dto';
import { responsive } from '@cloudinary/ng';
import { BootcampLogsService } from '../../features/services/concretes/bootcamp-logs.service';
import { BootcampLogsListItemDto } from '../../features/models/responses/bootcamp-logs/bootcamp-logs-list-item-dto';
import { GetListBootcampLogsResponse } from '../../features/models/responses/bootcamp-logs/get-list-bootcamp-logs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CreateBootcampLogsRequest } from '../../features/models/requests/bootcamp-logs/create-bootcamp-log-request';
import { CreatedBootcampLogsResponse } from '../../features/models/responses/bootcamp-logs/created-bootcamp-logs-response';
import { CertificateService } from '../../features/services/concretes/certificate.service';


@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css'
})
export class ChapterComponent implements OnInit, OnDestroy {
  certificateControl: boolean = false;
  certificateStatus: number = 0;
  currentUserId!: string;
  currentChapter!: GetByIdChapterResponse;
  currentBootcamp!: GetByIdBootcampResponse;
  chapterList!: GetListChapterResponse[];
  part!: number;
  chapterCount!: number;
  totalLength!: number;
  logs!: GetListBootcampLogsResponse[];
  safeUrl!: SafeResourceUrl;
  isloading: number = 0;
  timer: number = 0;
  interval: any;


  constructor(private bootcampServie: BootcampService, private chapterService: ChapterService, private authService: AuthService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute, private bootcampLogsService: BootcampLogsService, private sanitizer: DomSanitizer, private cdf: ChangeDetectorRef,private certificateService:CertificateService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const bootcampId = +params['bootcampId'];
      const chapterSort = +params['sort'];
      this.getChapterByBootcampIdAndSort(bootcampId, chapterSort);
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }


  getBootcamp() {
    this.bootcampServie.getBootcampById(this.currentChapter.bootcampId).subscribe(
      (response: GetByIdBootcampResponse) => {
        this.currentBootcamp = response
        this.isloading++;
        this.getChapters(this.currentBootcamp.id);
      })

  }

  getChapters(id: number) {
    this.chapterService.getListByBootcampId(id, { pageIndex: 0, pageSize: 100 }).subscribe(
      (response: ChapterListItemDto) => {
        this.chapterList = response.items;
        this.isloading++;
        this.getUserId();
        this.getTotalLength();
      })

  }

  getChapterByBootcampIdAndSort(bootcampId: number, chapterSort: number) {
    this.clearTimer(); // Clear any existing timer before starting a new one
    this.chapterService.getByChapterSortAndBootcampId(bootcampId, chapterSort).subscribe(
      (response: GetByIdChapterResponse) => {
        this.part = chapterSort;
        this.currentChapter = response;
        this.updateSafeUrl();
        this.isloading++;
        this.getBootcamp();
      },
      (error: any) => {
        this.toastr.error('Error fetching Chapter:', error);
        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 2000);
      }
    );

  }

  getLogs() {
    //Get Logs for progress bar
    this.bootcampLogsService.getListByUserId(this.currentUserId,this.currentChapter.bootcampId, { pageIndex: 0, pageSize: 100 }).subscribe(
      (response: BootcampLogsListItemDto) => {
        this.logs = response.items;
        
        this.certificateStatus = (this.logs.length * 100 ) / this.chapterList.length


        this.isloading++;
        this.cdf.detectChanges();
        this.checkLogsAndStartTimer();
      })

  }

  getUserId() {
    this.currentUserId = this.authService.getCurrentUserId();
    this.isloading++;
    this.getLogs();
  }

  updateSafeUrl(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.currentChapter.link}`);
  }

  addViewData() {
    //User finished chapter. Add it to the logs
    let request: CreateBootcampLogsRequest = {
      bootcampId: this.currentChapter.bootcampId,
      userId: this.currentUserId,
      chapterId: this.currentChapter.id,
      status: true
    }

    this.bootcampLogsService.add(request).subscribe(
      (response: CreatedBootcampLogsResponse) => {
        this.toastr.success("Successfully watched this chapter!")
        this.getLogs();
      },
      (error: any) => {
        console.error('Error while adding to Log');
        // Hata işleme mekanizmasını buraya ekleyebilirsiniz
      }
    );

  }

  getTotalLength() {
    this.totalLength = this.chapterList.reduce((total, chapter) => total + chapter.time, 0);
  }

  getChapterCount(): number {
    return this.chapterList.length;
  }

  checkLogsAndStartTimer() {
    let logExists = this.logs.some(log => log.chapterId == this.currentChapter.id && log.userId == this.currentUserId);
    console.log(logExists);
    
    if (!logExists) {
      this.startTimer(this.currentChapter.time);
    }
    else{
      this.clearTimer();
    }
  }

  // startTimer(duration: number) {
  //   this.timer = duration * 60;
  //   this.interval = setInterval(() => {
  //     if (this.timer > 0) {
  //       this.timer--;
  //     } else {
  //       clearInterval(this.interval);
  //       this.addViewData();
  //     }
  //     console.log(this.timer);
  //   }, 1000);
  // }

  startTimer(duration: number) {
    this.timer = duration * 60;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.addViewData();
      }
      console.log(this.timer);
    }, 1000);
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  get roundedCertificateStatus(): number {
    return parseFloat(this.certificateStatus.toFixed(2));
  }

  CreateCertificate(){
    this.toastr.success("certificate created successfully");
  }

  CreateAndDownloadCertificate() {
    const createCertificateDto = {
      bootcampId:this.currentBootcamp.id
    };

    this.certificateService.createAndDownloadCertificate(createCertificateDto).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificate.pdf'; // You can dynamically set the filename if needed
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.toastr.success("certificate created successfully");
    }, error => {
      console.error('Error downloading the certificate', error);
    });
  }

}

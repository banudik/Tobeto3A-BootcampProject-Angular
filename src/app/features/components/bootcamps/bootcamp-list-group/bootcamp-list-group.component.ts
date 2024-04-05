import { Component, NgModule, OnInit } from '@angular/core';
import { BootcampListItemDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { FilterByInstructorPipe } from '../../../../shared/pipes/filter-by-instructor-pipe.pipe';
import { PageRequest } from '../../../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bootcamp-list-group.component.html',
  styleUrl: './bootcamp-list-group.component.css'
})
export class BootcampListGroupComponent implements OnInit {
  currentPageNumber!:number;
  bootcampList:BootcampListItemDto={
    index:0,
    size:0,
    count:0,
    hasNext:false,
    hasPrevious:false,
    pages:0,
    items:[],

  }
  bootcamps: BootcampListItemDto[] = [];
  filteredBootcamps: BootcampListItemDto[] = []; // Filtrelenmiş bootcamp listesi
 

  constructor(private bootcampService: BootcampService, private filterByInstructorPipe: FilterByInstructorPipe,private activatedRoute:ActivatedRoute) { } 
  readonly PAGE_SIZE=6;// Pipe'i burada enjekte edin

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["instructorId"]){
        this.getBootcampListByInstructorId({page:0,pageSize:this.PAGE_SIZE},params["instructorId"])
      }else{this.getList({page:0,pageSize:this.PAGE_SIZE})}
    }) // Belirli bir eğitmenin bootcamp'lerini al
  }

  getBootcampByInstructorId(instructorId: string): void {
    const pageRequest: PageRequest = { page: 0, pageSize: 6 }; // Örnek sayfa isteği
    this.bootcampService.getBootcampListByInstructorId(pageRequest, instructorId).subscribe(
      bootcamps => {
        this.bootcampList = bootcamps; // Tüm bootcamp'leri al

      },
      error => {
        console.error('Error fetching bootcamps:', error);
      }
    );
  }

  getList(pageRequest:PageRequest){
    this.bootcampService.getList(pageRequest).subscribe((response)=>{
      this.bootcampList=response;
      this.updateCurrentPageNumber();
    })
    
  }
  getBootcampListByInstructorId(pageRequest:PageRequest,instructorId:string){
    this.bootcampService.getBootcampListByInstructorId(pageRequest,instructorId).subscribe((response)=>{
      this.bootcampList=response;
      this.updateCurrentPageNumber();
    })
  }

  onViewMoreClicked():void{
    const nextPageIndex = this.bootcampList.index+1;
    const pageSize = this.bootcampList.size;

    this.getList({page:nextPageIndex,pageSize})
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked():void{
    const previousPageIndex = this.bootcampList.index-1;
    const pageSize = this.bootcampList.size;
    this.getList({page:previousPageIndex,pageSize});
    this.updateCurrentPageNumber();
  }

  updateCurrentPageNumber():void{
    this.currentPageNumber=this.bootcampList.index+1;
  }

}



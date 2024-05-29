import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../../features/services/concretes/employee.service';
import { EmployeeListItemDto } from '../../../../../features/models/responses/employee/employee-list-item-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageRequest } from '../../../../../core/models/page-request';
import { AuthService } from '../../../../../features/services/concretes/auth.service';

@Component({
  selector: 'app-employeeindex',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './employeeindex.component.html',
  styleUrl: './employeeindex.component.css'
})
export class EmployeeindexComponent implements OnInit {
  readonly PAGE_SIZE = 100000; //for api
  currentPageNumber: number = 1;
  pageSize: number = 5;
  pageSizes: Array<number> = [5,10,20];
  searchTermTmp:string = '';
  isLoading: boolean = false;
  isAdmin:boolean = false;
  constructor(private employeeService:EmployeeService,private authService:AuthService) {}

  employeeList: EmployeeListItemDto = {
    index: 0,
  
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  filteredEmployeeList: EmployeeListItemDto = this.employeeList;

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) 
    //console.log("start " + this.bootcampStateList.items.length);
    this.checkIfAdmin();
    this.visibleData();
    this.pageNumbers();
  }


  getList(pageRequest: PageRequest) {
    this.isLoading = true;
    this.employeeService.getList(pageRequest).subscribe((response) => {
      this.employeeList = response;
      this.isLoading = false;
    })
  }

  checkIfAdmin(){
    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }
  }


  visibleData(){
    let startIndex = (this.currentPageNumber - 1 )* this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if(this.filteredEmployeeList.items.length == 0 && this.searchTermTmp == ''){
      return this.employeeList.items.slice(startIndex,endIndex);
    }
    return this.filteredEmployeeList.items.slice(startIndex,endIndex);
  }

  nextPage(){
    this.currentPageNumber++;
    this.visibleData();

  }

  previousPage(){
    this.currentPageNumber--;
    this.visibleData();
  }

  pageNumbers(){
    let totalPages:number;

    if(this.filteredEmployeeList.items.length == 0 && this.searchTermTmp == ''){
      totalPages = Math.ceil(this.employeeList.items.length / this.pageSize);
    }
    else{
      totalPages = Math.ceil(this.filteredEmployeeList.items.length / this.pageSize);
    }
    
    let pageNumArray = new Array(totalPages);
    return pageNumArray;
  }

  changePage(pageNumber:number){
    this.currentPageNumber = pageNumber;
    this.visibleData();
  }

  changePageSize(pageSize:string){
    this.pageSize = parseInt(pageSize, 10);
    this.visibleData();
  }


  filterData(searchTerm: string) {
    this.searchTermTmp = searchTerm;
    this.filteredEmployeeList.items = this.employeeList.items.filter((item) => {
      return Object.values(item).some((val) => {
        return val.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    this.visibleData();
  }
}
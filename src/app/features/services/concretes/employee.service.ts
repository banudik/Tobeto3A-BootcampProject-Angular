import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeBaseService } from '../abstracts/employee-base.service';
import { GetListEmployeeResponse } from '../../models/responses/employee/get-list-employee-response';
import { GetByIdEmployeeResponse } from '../../models/responses/employee/get-by-id-employee-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EmployeeBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListEmployeeResponse[]> {
    return this.httpClient.get<GetListEmployeeResponse[]>(this.apiGetListUrl);
  }

  override getById(): Observable<GetByIdEmployeeResponse> {
    return this.httpClient.get<GetByIdEmployeeResponse>(this.apiGetByIdUrl);
  }
}
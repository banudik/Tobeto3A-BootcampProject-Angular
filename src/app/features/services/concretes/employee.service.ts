import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeBaseService } from '../abstracts/employee-base.service';
import { GetListEmployeeResponse } from '../../models/responses/employee/get-list-employee-response';
import { GetByIdEmployeeResponse } from '../../models/responses/employee/get-by-id-employee-response';
import { DeletedEmployeeResponse } from '../../models/responses/employee/deleted-employee-response';
import { EmployeeListItemDto } from '../../models/responses/employee/employee-list-item-dto';
import { CreateEmployeeRequest } from '../../models/requests/employee/create-employee-request';
import { UpdateEmployeeRequest } from '../../models/requests/employee/update-employee-request';
import { CreatedEmployeeResponse } from '../../models/responses/employee/created-employee-response';
import { UpdatedEmployeeResponse } from '../../models/responses/employee/updated-employee-response';
import { environment } from '../../../../environments/environment';
import { PageRequest } from '../../../core/models/page-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends EmployeeBaseService {
  
  override update(updateEmployeeRequest: UpdateEmployeeRequest): Observable<UpdatedEmployeeResponse> {
    return this.httpClient.put<UpdatedEmployeeResponse>(this.apiUrl,updateEmployeeRequest);
  }

  constructor(private httpClient:HttpClient) {super() }

  override delete(id: string): Observable<DeletedEmployeeResponse> {
    return this.httpClient.delete<DeletedEmployeeResponse>(`${this.apiUrl}/`+id);
  }


  private readonly apiUrl:string = `${environment.API_URL}/employees`

  override getList(pageRequest:PageRequest): Observable<EmployeeListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<EmployeeListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:EmployeeListItemDto={
          index:pageRequest.pageIndex,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages
        };
        
        return newResponse;
      })
    )
  }
  
  override getEmployeeById(employeeId:string): Observable<GetByIdEmployeeResponse> {
    return this.httpClient.get<GetByIdEmployeeResponse>(`${this.apiUrl}/`+employeeId);
  }
}
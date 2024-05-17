import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampStateBaseService } from '../abstracts/bootcamp-state-base.service';
import { GetListBootcampStateResponse } from '../../models/responses/bootcamp-state/get-list-bootcamp-state-response';
import { GetByIdBootcampStateResponse } from '../../models/responses/bootcamp-state/get-by-id-bootcamp-state-response';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampStateListItemDto } from '../../models/responses/bootcamp-state/bootcampstate-list-item-dto';
import { environment } from '../../../../environments/environment.development';
import { CreateBootcampStateRequest } from '../../models/requests/bootcamp-state/create-bootcamp-state-request';
import { DeletedBootcampStateResponse } from '../../models/responses/bootcamp-state/deleted-bootcamp-state-response';
import { CreatedBootcampStateResponse } from '../../models/responses/bootcamp-state/created-bootcamp-state-response';
import { UpdateBootcampStateRequest } from '../../models/requests/bootcamp-state/update-bootcamp-state-request';
import { UpdatedBootcampStateResponse } from '../../models/responses/bootcamp-state/updated-bootcamp-state-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService {

  private readonly apiUrl:string = `${environment.API_URL}/bootcampstates`






  


  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override add(request: CreateBootcampStateRequest): Observable<CreatedBootcampStateResponse> {
    return this.httpClient.post<CreatedBootcampStateResponse>(this.apiUrl,request);
  }

  override update(request: UpdateBootcampStateRequest): Observable<UpdatedBootcampStateResponse> {
    return this.httpClient.put<UpdatedBootcampStateResponse>(this.apiUrl,request);
  }


  override delete(id: number): Observable<DeletedBootcampStateResponse> {
    return this.httpClient.delete<DeletedBootcampStateResponse>(`${this.apiUrl}/`+id)
  }

  

  override getList(pageRequest: PageRequest): Observable<BootcampStateListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<BootcampStateListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampStateListItemDto={
          index:pageRequest.page,
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

  override getById(id:number): Observable<GetByIdBootcampStateResponse>{
    return this.httpClient.get<GetByIdBootcampStateResponse>(`${this.apiUrl}/`+id);
  }
}
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlacklistBaseService } from '../abstracts/blacklist-base.service';
import { GetListBlacklistResponse } from '../../models/responses/blacklist/get-list-blacklist-response';
import { GetByIdBlacklistResponse } from '../../models/responses/blacklist/get-by-id-blacklist-response';
import { environment } from '../../../../environments/environment.development';
import { CreateBlacklistRequest } from '../../models/requests/blacklist/create-blacklist-request';
import { CreatedBlacklistResponse } from '../../models/responses/blacklist/created-blacklist-response';
import { PageRequest } from '../../../core/models/page-request';
import { BlacklistListItemDto } from '../../models/responses/blacklist/blacklist-list-item-dto';
import { UpdateBlacklistRequest } from '../../models/requests/blacklist/update-blacklist-request';
import { DeletedBlacklistResponse } from '../../models/responses/blacklist/deleted-blacklist-response';
import { UpdatedBlacklistResponse } from '../../models/responses/blacklist/updated-blacklist-response';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService extends BlacklistBaseService {



  private readonly apiUrl:string = `${environment.API_URL}/blacklists`
  constructor(private httpClient:HttpClient) {super() }

  override delete(id: number): Observable<DeletedBlacklistResponse> {
    return this.httpClient.delete<DeletedBlacklistResponse>(`${this.apiUrl}/`+id);
  }
  override update(updateBlackListRequest: UpdateBlacklistRequest): Observable<UpdatedBlacklistResponse> {
    return this.httpClient.post<UpdatedBlacklistResponse>(this.apiUrl,updateBlackListRequest);
  }
  
  override getList(pageRequest:PageRequest): Observable<BlacklistListItemDto>  {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<BlacklistListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BlacklistListItemDto={
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

  override getById(id:number): Observable<GetByIdBlacklistResponse> {
    return this.httpClient.get<GetByIdBlacklistResponse>(`${this.apiUrl}/`+id);
  }

  override blackListApplicant(createBlackListRequest: CreateBlacklistRequest): Observable<CreatedBlacklistResponse> {
    return this.httpClient.post<CreatedBlacklistResponse>(`${this.apiUrl}`,createBlackListRequest);
  }
}
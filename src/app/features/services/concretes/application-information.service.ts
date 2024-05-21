import { Injectable } from '@angular/core';
import { ApplicationInformationBaseService } from '../abstracts/application-information-base.service'
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GetListApplicationInformationResponse } from '../../models/responses/application-information/get-list-application-information-response';
import { GetByIdApplicationInformationResponse } from '../../models/responses/application-information/get-by-id-application-information-response';
import { CreatedApplicationInformationResponse } from '../../models/responses/application-information/created-application-information-response';
import { environment } from '../../../../environments/environment';
import { CreateApplicationInformationRequest } from '../../models/requests/application-information/create-application-information-request';
import { UpdateApplicationInformationRequest } from '../../models/requests/application-information/update-application-information-request';
import { DeletedApplicationInformationResponse } from '../../models/responses/application-information/deleted-application-information-response';
import { UpdatedApplicationInformationResponse } from '../../models/responses/application-information/updated-application-information-response';
import { ApplicationInformatinListItemDto } from '../../models/responses/application-information/application-information-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInformationService extends ApplicationInformationBaseService {



  override update(request: UpdateApplicationInformationRequest): Observable<UpdatedApplicationInformationResponse> {
    return this.httpClient.put<UpdatedApplicationInformationResponse>(this.apiUrl,request);
  }
  override delete(id: number): Observable<DeletedApplicationInformationResponse> {
    return this.httpClient.delete<DeletedApplicationInformationResponse>(`${this.apiUrl}/`+id)
  }
  
  private readonly apiUrl:string = `${environment.API_URL}/ApplicationInformations`
  constructor(private httpClient:HttpClient) {super() }

  override getList(pageRequest: PageRequest): Observable<ApplicationInformatinListItemDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.pageIndex,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<ApplicationInformatinListItemDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:ApplicationInformatinListItemDto={
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

  override getById(applicationId:number): Observable<GetByIdApplicationInformationResponse> {
  return this.httpClient.get<GetByIdApplicationInformationResponse>(`${this.apiUrl}/`+applicationId);
  }

  override addApplication(createApplicationInformationRequest:CreateApplicationInformationRequest): Observable<CreatedApplicationInformationResponse> {
    return this.httpClient.post<CreatedApplicationInformationResponse>(`${this.apiUrl}`,createApplicationInformationRequest);
  }
}
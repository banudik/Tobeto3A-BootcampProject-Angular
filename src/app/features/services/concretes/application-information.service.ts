import { Injectable } from '@angular/core';
import { ApplicationInformationBaseService } from '../abstracts/application-information-base.service'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetListApplicationInformationResponse } from '../../models/responses/application-information/get-list-application-information-response';
import { GetByIdApplicationInformationResponse } from '../../models/responses/application-information/get-by-id-application-information-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInformationService extends ApplicationInformationBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListApplicationInformationResponse[]> {
    return this.httpClient.get<GetListApplicationInformationResponse[]>(this.apiGetListUrl);
  }

  override getById(): Observable<GetByIdApplicationInformationResponse> {
  return this.httpClient.get<GetByIdApplicationInformationResponse>(this.apiGetByIdUrl);
}
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ApplicationStateInformationBaseService } from '../abstracts/application-state-information-base.service';
import {GetListApplicationStateInformationResponse } from '../../models/responses/application-state-information/get-list-application-state-information-response';
import { GetByIdApplicationStateInformationResponse } from '../../models/responses/application-state-information/get-by-id-application-state-information-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateInformationService extends ApplicationStateInformationBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListApplicationStateInformationResponse[]> {
    return this.httpClient.get<GetListApplicationStateInformationResponse[]>(this.apiGetListUrl);
  }

  override getById():Observable<GetByIdApplicationStateInformationResponse> {
    return this.httpClient.get<GetByIdApplicationStateInformationResponse>(this.apiGetByIdUrl);
  }
 

}
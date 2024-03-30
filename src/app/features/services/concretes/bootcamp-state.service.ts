import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampStateBaseService } from '../abstracts/bootcamp-state-base.service';
import { GetListBootcampStateResponse } from '../../models/responses/bootcamp-state/get-list-bootcamp-state-response';
import { GetByIdBootcampStateResponse } from '../../models/responses/bootcamp-state/get-by-id-bootcamp-state-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampStateService extends BootcampStateBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListBootcampStateResponse[]> {
    return this.httpClient.get<GetListBootcampStateResponse[]>(this.apiGetListUrl);
  }

  override getById(): Observable<GetByIdBootcampStateResponse>{
    return this.httpClient.get<GetByIdBootcampStateResponse>(this.apiGetByIdUrl);
  }
}
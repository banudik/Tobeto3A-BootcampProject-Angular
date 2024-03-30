import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { GetListBootcampResponse } from '../../models/responses/bootcamp/get-list-bootcamp-response';
import { GetByIdBootcampResponse } from '../../models/responses/bootcamp/get-by-id-bootcamp-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {
  apiGetListUrl="http://localhost:5001/api/Bootcamps/GetAllAsync";
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListBootcampResponse[]> {
    return this.httpClient.get<GetListBootcampResponse[]>(this.apiGetListUrl);
  }

  override getById(): Observable<GetByIdBootcampResponse> {
    return this.httpClient.get<GetByIdBootcampResponse>(this.apiGetByIdUrl);
  }
}


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BootcampImageBaseService } from '../abstracts/bootcamp-image-base.service';
import { GetListBootcampImageResponse } from '../../models/responses/bootcamp-image/get-list-bootcamp-image-response';
import { GetByIdBootcampImageResponse } from '../../models/responses/bootcamp-image/get-by-id-bootcamp-image-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampImageService extends BootcampImageBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListBootcampImageResponse[]> {
    return this.httpClient.get<GetListBootcampImageResponse[]>(this.apiGetListUrl);
  }

  override getById(): Observable<GetByIdBootcampImageResponse> {
    return this.httpClient.get<GetByIdBootcampImageResponse>(this.apiGetByIdUrl);
  }
}

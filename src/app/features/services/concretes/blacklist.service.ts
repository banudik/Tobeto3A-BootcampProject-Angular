import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlacklistBaseService } from '../abstracts/blacklist-base.service';
import { GetListBlacklistResponse } from '../../models/responses/blacklist/get-list-blacklist-response';
import { GetByIdBlacklistResponse } from '../../models/responses/blacklist/get-by-id-blacklist-response';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService extends BlacklistBaseService {
  apiGetListUrl=""
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListBlacklistResponse[]> {
    return this.httpClient.get<GetListBlacklistResponse[]>(this.apiGetListUrl);
  }

  override getById(): Observable<GetByIdBlacklistResponse> {
    return this.httpClient.get<GetByIdBlacklistResponse>(this.apiGetByIdUrl);
  }
}
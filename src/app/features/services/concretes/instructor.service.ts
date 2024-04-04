import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { GetListInstructorResponse } from '../../models/responses/instructor/get-list-instructor-response';
import { GetByIdInstructorResponse } from '../../models/responses/instructor/get-by-id-instructor-response';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService {
  private readonly apiUrl:string = `${environment.API_URL}/instructor`
  apiGetByIdUrl=""
  constructor(private httpClient:HttpClient) {super() }

  override getList(): Observable<GetListInstructorResponse[]> {
    return this.httpClient.get<GetListInstructorResponse[]>(this.apiUrl);
  }

  override getById(): Observable<GetByIdInstructorResponse> {
    return this.httpClient.get<GetByIdInstructorResponse>(this.apiUrl);
  }
}
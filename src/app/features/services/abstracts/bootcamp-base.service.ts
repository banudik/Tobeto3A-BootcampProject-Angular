import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampListItemDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { GetByIdBootcampResponse } from '../../models/responses/bootcamp/get-by-id-bootcamp-response';

@Injectable()
export abstract class BootcampBaseService {

  abstract getList(pageRequest:PageRequest):
  Observable<BootcampListItemDto>;
  /**abstract getById(pageRequest:PageRequest,id:string):Observable<GetByIdBootcampResponse[]>;**/
  abstract getBootcampListByInstructorId(pageRequest:PageRequest,instructorId:string):Observable<BootcampListItemDto>;
  abstract getBootcampById(BootcampId:number):
  Observable<GetByIdBootcampResponse>;
}

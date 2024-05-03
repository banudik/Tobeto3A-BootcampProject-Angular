import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampListItemDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { GetByIdBootcampResponse } from '../../models/responses/bootcamp/get-by-id-bootcamp-response';
import { CreateBootcampRequest } from '../../models/requests/bootcamp/create-bootcamp-request';
import { CreatedBootcampResponse } from '../../models/responses/bootcamp/created-bootcamp-response';
import { UpdateBootcampRequest } from '../../models/requests/bootcamp/update-bootcamp-request';
import { DeletedBootcampResponse } from '../../models/responses/bootcamp/deleted-bootcamp-response';
import { UpdatedBootcampResponse } from '../../models/responses/bootcamp/updated-bootcamp-response';

@Injectable()
export abstract class BootcampBaseService {

  abstract getList(pageRequest:PageRequest):
  Observable<BootcampListItemDto>;
  /**abstract getById(pageRequest:PageRequest,id:string):Observable<GetByIdBootcampResponse[]>;**/
  abstract getBootcampListByInstructorId(pageRequest:PageRequest,instructorId:string):Observable<BootcampListItemDto>;
  abstract getBootcampById(BootcampId:number):
  Observable<GetByIdBootcampResponse>;

  abstract add(request:FormData)
  :Observable<CreatedBootcampResponse>;
  abstract update(request:UpdateBootcampRequest)
  :Observable<UpdatedBootcampResponse>;
abstract delete(id:number)
  :Observable<DeletedBootcampResponse>;
}

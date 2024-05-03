import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListBootcampStateResponse } from '../../models/responses/bootcamp-state/get-list-bootcamp-state-response';
import { GetByIdBootcampStateResponse } from '../../models/responses/bootcamp-state/get-by-id-bootcamp-state-response';
import { BootcampStateListItemDto } from '../../models/responses/bootcamp-state/bootcampstate-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { CreateBootcampStateRequest } from '../../models/requests/bootcamp-state/create-bootcamp-state-request';
import { DeletedBootcampStateResponse } from '../../models/responses/bootcamp-state/deleted-bootcamp-state-response';
import { UpdateBootcampStateRequest } from '../../models/requests/bootcamp-state/update-bootcamp-state-request';
import { UpdatedBootcampStateResponse } from '../../models/responses/bootcamp-state/updated-bootcamp-state-response';
import { CreatedBootcampStateResponse } from '../../models/responses/bootcamp-state/created-bootcamp-state-response';

@Injectable()
export abstract class BootcampStateBaseService {

  abstract getList(pageRequest:PageRequest):
  Observable<BootcampStateListItemDto>;
  abstract getById(id:number):
  Observable<GetByIdBootcampStateResponse>;
  abstract add(request:CreateBootcampStateRequest)
  :Observable<CreatedBootcampStateResponse>;
  abstract update(request:UpdateBootcampStateRequest)
  :Observable<UpdatedBootcampStateResponse>;
abstract delete(id:number)
  :Observable<DeletedBootcampStateResponse>;
}

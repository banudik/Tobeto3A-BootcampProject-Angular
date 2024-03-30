import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListBootcampStateResponse } from '../../models/responses/bootcamp-state/get-list-bootcamp-state-response';
import { GetByIdBootcampStateResponse } from '../../models/responses/bootcamp-state/get-by-id-bootcamp-state-response';

@Injectable()
export abstract class BootcampStateBaseService {

  abstract getList():
  Observable<GetListBootcampStateResponse[]>;
  abstract getById():
  Observable<GetByIdBootcampStateResponse>;
}

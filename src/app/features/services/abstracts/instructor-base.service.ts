import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListInstructorResponse } from '../../models/responses/instructor/get-list-instructor-response';
import { GetByIdInstructorResponse } from '../../models/responses/instructor/get-by-id-instructor-response';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';

@Injectable()
export abstract class InstructorBaseService {

  abstract getList():
  Observable<GetListInstructorResponse[]>;
  abstract getById():
  Observable<GetByIdInstructorResponse>;
  abstract GetListAll():
  Observable<InstructorListItemDto>;
}

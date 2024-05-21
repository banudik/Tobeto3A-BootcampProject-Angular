import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListInstructorResponse } from '../../models/responses/instructor/get-list-instructor-response';
import { GetByIdInstructorResponse } from '../../models/responses/instructor/get-by-id-instructor-response';
import { InstructorListItemDto } from '../../models/responses/instructor/instructor-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { UpdateInstructorRequest } from '../../models/requests/instructor/update-instructor-request';
import { DeletedInstructorResponse } from '../../models/responses/instructor/deleted-instructor-response';
import { UpdatedInstructorResponse } from '../../models/responses/instructor/updated-instructor-response';

@Injectable()
export abstract class InstructorBaseService {

  abstract GetListAll():
  Observable<InstructorListItemDto>;
  abstract getList(pageRequest: PageRequest):
  Observable<InstructorListItemDto>;

abstract getInstructorById(instructorId: string):
  Observable<GetByIdInstructorResponse>;

abstract delete(id: string)
  : Observable<DeletedInstructorResponse>;

  abstract update(updateInstructorRequest: UpdateInstructorRequest)
  : Observable<UpdatedInstructorResponse>;
}

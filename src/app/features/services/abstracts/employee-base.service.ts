import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetByIdEmployeeResponse } from '../../models/responses/employee/get-by-id-employee-response';
import { EmployeeListItemDto } from '../../models/responses/employee/employee-list-item-dto';
import { DeletedEmployeeResponse } from '../../models/responses/employee/deleted-employee-response';
import { PageRequest } from '../../../core/models/page-request';
import { UpdateEmployeeRequest } from '../../models/requests/employee/update-employee-request';
import { UpdatedEmployeeResponse } from '../../models/responses/employee/updated-employee-response';
import { CreateEmployeeRequest } from '../../models/requests/employee/create-employee-request';
import { CreatedEmployeeResponse } from '../../models/responses/employee/created-employee-response';

@Injectable()
export abstract class EmployeeBaseService {


  abstract getList(pageRequest: PageRequest):
    Observable<EmployeeListItemDto>;

  abstract getEmployeeById(employeeId: string):
    Observable<GetByIdEmployeeResponse>;

  abstract delete(id: string)
    : Observable<DeletedEmployeeResponse>;

    abstract update(updateEmployeeRequest: UpdateEmployeeRequest)
    : Observable<UpdatedEmployeeResponse>;


}

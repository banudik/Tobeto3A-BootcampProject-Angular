import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UpdateUserRequest } from "../../models/requests/users/update-user-request";
import { GetByIdUserResponse } from "../../models/responses/users/get-by-id-user-response";
import { UpdatedUserResponse } from "../../models/responses/users/updated-user-response";

@Injectable()

export abstract class UserBaseService {


    abstract getByUserId(userId: string):
        Observable<GetByIdUserResponse>;

    abstract update(request: UpdateUserRequest)
        : Observable<UpdatedUserResponse>;


}
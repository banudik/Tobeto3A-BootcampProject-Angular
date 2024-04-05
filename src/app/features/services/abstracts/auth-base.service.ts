import { Injectable } from "@angular/core";
import { UserForRegisterRequest } from "../../models/requests/users/user-for-register-request";
import { Observable } from "rxjs";
import { UserForRegisterResponse } from "../../models/responses/users/user-for-register-response";

@Injectable()
export abstract class AuthBaseService{
    abstract register(userforRegisterRequest:UserForRegisterRequest)
                     :Observable<UserForRegisterResponse>
}
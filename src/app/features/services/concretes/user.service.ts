import { Observable } from "rxjs";
import { GetByIdUserResponse } from "../../models/responses/users/get-by-id-user-response";
import { UserBaseService } from "../abstracts/user-base-service";
import { UpdateUserRequest } from "../../models/requests/users/update-user-request";
import { UpdatedUserResponse } from "../../models/responses/users/updated-user-response";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class UserService extends UserBaseService {
    private readonly apiUrl:string = `${environment.API_URL}/users`
    
    constructor(private httpClient:HttpClient) {super() }


    override update(request: UpdateUserRequest): Observable<UpdatedUserResponse> {
        return this.httpClient.put<UpdatedUserResponse>(this.apiUrl,request);
    }


    override getByUserId(userId: string): Observable<GetByIdUserResponse> {
        return this.httpClient.get<GetByIdUserResponse>(`${this.apiUrl}/`+userId);
    }
  

  
   

  
  }
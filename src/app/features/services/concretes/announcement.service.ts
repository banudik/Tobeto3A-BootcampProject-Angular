import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { PageRequest } from "../../../core/models/page-request";
import { CreateAnnouncementRequest } from "../../models/requests/announcement/create-announcement-request";
import { UpdateAnnouncementRequest } from "../../models/requests/announcement/update-announcement-request";
import { AnnouncementListItemDto } from "../../models/responses/announcement/announcement-list-item-dto";
import { CreatedAnnouncementResponse } from "../../models/responses/announcement/created-announcement-response";
import { DeletedAnnouncementResponse } from "../../models/responses/announcement/deleted-announcement-response";
import { GetByIdAnnouncementResponse } from "../../models/responses/announcement/get-by-id-announcement-response";
import { UpdatedAnnouncementResponse } from "../../models/responses/announcement/updated-announcement-response";
import { AnnouncementBaseService } from "../abstracts/announcement-base-service";


@Injectable({
    providedIn: 'root'
  })
  export class AnnouncementService extends AnnouncementBaseService {
  
    private readonly apiUrl:string = `${environment.API_URL}/announcements`
    
    constructor(private httpClient:HttpClient) {super() }
  
    override getList(pageRequest:PageRequest): Observable<AnnouncementListItemDto> {
      const newRequest: {[key: string]: string | number} = {
        pageIndex: pageRequest.pageIndex,
        pageSize: pageRequest.pageSize
      };
  
      return this.httpClient.get<AnnouncementListItemDto>(this.apiUrl, {
        params: newRequest
      }).pipe(
        map((response)=>{
          const newResponse:AnnouncementListItemDto={
            index:pageRequest.pageIndex,
            size:pageRequest.pageSize,
            count:response.count,
            hasNext:response.hasNext,
            hasPrevious:response.hasPrevious,
            items:response.items,
            pages:response.pages
          };
          
          return newResponse;
        })
      )
    }
  
    override getByAnoouncementId(id:number):Observable<GetByIdAnnouncementResponse> {
      return this.httpClient.get<GetByIdAnnouncementResponse>(`${this.apiUrl}/`+id);
    }
   
    override add(request: CreateAnnouncementRequest): Observable<CreatedAnnouncementResponse> {
      return this.httpClient.post<CreatedAnnouncementResponse>(this.apiUrl,request);
    }
    override update(request: UpdateAnnouncementRequest): Observable<UpdatedAnnouncementResponse> {
      return this.httpClient.put<UpdatedAnnouncementResponse>(this.apiUrl,request);
    }
    override delete(id: number): Observable<DeletedAnnouncementResponse> {
      return this.httpClient.delete<DeletedAnnouncementResponse>(`${this.apiUrl}/`+id)
    }
  
  }
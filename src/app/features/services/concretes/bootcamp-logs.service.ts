import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { PageRequest } from "../../../core/models/page-request";
import { CreateBootcampLogsRequest } from "../../models/requests/bootcamp-logs/create-bootcamp-log-request";
import { BootcampLogsListItemDto } from "../../models/responses/bootcamp-logs/bootcamp-logs-list-item-dto";
import { CreatedBootcampLogsResponse } from "../../models/responses/bootcamp-logs/created-bootcamp-logs-response";
import { BootcampLogsBaseService } from "../abstracts/bootcamp-logs-base.service";


@Injectable({
    providedIn: 'root'
  })
  export class BootcampLogsService extends BootcampLogsBaseService {
  
    private readonly apiUrl:string = `${environment.API_URL}/bootcamplogs`
    
    constructor(private httpClient:HttpClient) {super() }
  
    override getList(pageRequest:PageRequest): Observable<BootcampLogsListItemDto> {
      const newRequest: {[key: string]: string | number} = {
        pageIndex: pageRequest.pageIndex,
        pageSize: pageRequest.pageSize
      };
  
      return this.httpClient.get<BootcampLogsListItemDto>(this.apiUrl, {
        params: newRequest
      }).pipe(
        map((response)=>{
          const newResponse:BootcampLogsListItemDto={
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

    override getListByUserId(userId:string,bootcampId:number,pageRequest:PageRequest): Observable<BootcampLogsListItemDto> {
        const newRequest: {[key: string]: string | number} = {
          pageIndex: pageRequest.pageIndex,
          pageSize: pageRequest.pageSize,
          userId: userId,
          bootcampId:bootcampId
        };
    
        return this.httpClient.get<BootcampLogsListItemDto>(`${this.apiUrl}/getlistbyuserid`, {
          params: newRequest
        }).pipe(
          map((response)=>{
            const newResponse:BootcampLogsListItemDto={
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
  
   
    override add(request: CreateBootcampLogsRequest): Observable<CreatedBootcampLogsResponse> {
      return this.httpClient.post<CreatedBootcampLogsResponse>(this.apiUrl,request);
    }
  
  }
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { PageRequest } from "../../../core/models/page-request";
import { CreateChapterRequest } from "../../models/requests/chapter/create-chapter-request";
import { UpdateChapterRequest } from "../../models/requests/chapter/update-chapter-request";
import { ChapterListItemDto } from "../../models/responses/chapter/chapter-list-item-dto";
import { CreatedChapterResponse } from "../../models/responses/chapter/created-chapter-response";
import { DeletedChapterResponse } from "../../models/responses/chapter/deleted-chapter-response";
import { GetByIdChapterResponse } from "../../models/responses/chapter/get-by-id-chapter-response";
import { UpdatedChapterResponse } from "../../models/responses/chapter/updated-chapter-response";
import { ChapterBaseService } from "../abstracts/chapter-base-service";

@Injectable({
    providedIn: 'root'
  })
  export class ChapterService extends ChapterBaseService {
  
    private readonly apiUrl:string = `${environment.API_URL}/chapters`
    
    constructor(private httpClient:HttpClient) {super() }
  
    override getList(pageRequest:PageRequest): Observable<ChapterListItemDto> {
      const newRequest: {[key: string]: string | number} = {
        pageIndex: pageRequest.pageIndex,
        pageSize: pageRequest.pageSize
      };
  
      return this.httpClient.get<ChapterListItemDto>(this.apiUrl, {
        params: newRequest
      }).pipe(
        map((response)=>{
          const newResponse:ChapterListItemDto={
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

    override getListByBootcampId(bootcampId:number,pageRequest:PageRequest): Observable<ChapterListItemDto> {
      const newRequest: {[key: string]: string | number} = {
        pageIndex: pageRequest.pageIndex,
        pageSize: pageRequest.pageSize,
        bootcampId: bootcampId
      };
  
      return this.httpClient.get<ChapterListItemDto>(this.apiUrl, {
        params: newRequest
      }).pipe(
        map((response)=>{
          const newResponse:ChapterListItemDto={
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
  
    override getByChapterId(id:number):Observable<GetByIdChapterResponse> {
      return this.httpClient.get<GetByIdChapterResponse>(`${this.apiUrl}/`+id);
    }
   
    override add(request: CreateChapterRequest): Observable<CreatedChapterResponse> {
      return this.httpClient.post<CreatedChapterResponse>(this.apiUrl,request);
    }
    override update(request: UpdateChapterRequest): Observable<UpdatedChapterResponse> {
      return this.httpClient.put<UpdatedChapterResponse>(this.apiUrl,request);
    }
    override delete(id: number): Observable<DeletedChapterResponse> {
      return this.httpClient.delete<DeletedChapterResponse>(`${this.apiUrl}/`+id)
    }
  
  }
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../../environments/environment";
import { PageRequest } from "../../../core/models/page-request";
import { CreateCommentRequest } from "../../models/requests/comment/create-comment-request";
import { UpdateCommentRequest } from "../../models/requests/comment/update-comment-request";
import { CommentListItemDto } from "../../models/responses/comment/comment-list-item-dto";
import { CreatedCommentResponse } from "../../models/responses/comment/created-comment-response";
import { DeletedCommentResponse } from "../../models/responses/comment/deleted-comment-respones";
import { GetByIdCommentResponse } from "../../models/responses/comment/get-by-id-comment-response";
import { CommentBaseService } from "../abstracts/comment-base-service";
import { UpdatedCommentResponse } from "../../models/responses/comment/updated-comment-response";
import { DynamicQuery } from "../../../core/models/dynamic-query";

@Injectable({
    providedIn: 'root'
  })
  export class CommentService extends CommentBaseService {

  
    private readonly apiUrl:string = `${environment.API_URL}/comments`
    
    constructor(private httpClient:HttpClient) {super() }

    override getListByBootcampId(pageRequest: PageRequest, bootcampId: number): Observable<CommentListItemDto> {
      const newRequest: {[key: string]: string | number} = {
        bootcampId: bootcampId,
        pageIndex: pageRequest.pageIndex,
        pageSize: pageRequest.pageSize
      };
  
      return this.httpClient.get<CommentListItemDto>(`${this.apiUrl}/getlistbybootcampid`, {
        params: newRequest
      }).pipe(
        map((response)=>{
          const newResponse:CommentListItemDto={
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
  
    override getList(pageRequest:PageRequest): Observable<CommentListItemDto> {
      const newRequest: {[key: string]: string | number} = {
        pageIndex: pageRequest.pageIndex,
        pageSize: pageRequest.pageSize
      };
  
      return this.httpClient.get<CommentListItemDto>(this.apiUrl, {
        params: newRequest
      }).pipe(
        map((response)=>{
          const newResponse:CommentListItemDto={
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
  
    override getByCommentId(id:number):Observable<GetByIdCommentResponse> {
      return this.httpClient.get<GetByIdCommentResponse>(`${this.apiUrl}/`+id);
    }
   
    override add(request: CreateCommentRequest): Observable<CreatedCommentResponse> {
      return this.httpClient.post<CreatedCommentResponse>(this.apiUrl,request);
    }
    override update(request: UpdateCommentRequest): Observable<UpdatedCommentResponse> {
      return this.httpClient.put<UpdatedCommentResponse>(this.apiUrl,request);
    }
    override delete(id: number): Observable<DeletedCommentResponse> {
      return this.httpClient.delete<DeletedCommentResponse>(`${this.apiUrl}/`+id)
    }

    getListCommentByDynamic(pageRequest: PageRequest, dynamic: DynamicQuery): Observable<CommentListItemDto> {
        return this.httpClient.post<CommentListItemDto>(`${this.apiUrl}/dynamic/`, {
          filter: dynamic.filter,
          sort: dynamic.sort
        }, { params: new HttpParams().set("pageIndex", pageRequest.pageIndex).set("pageSize", pageRequest.pageSize) }).pipe(
          map((response) => {
            const newResponse: CommentListItemDto = {
              index: pageRequest.pageIndex,
              size: pageRequest.pageSize,
              count: response.count,
              hasNext: response.hasNext,
              hasPrevious: response.hasPrevious,
              items: response.items,
              pages: response.pages
            };
            return newResponse;
          })
        )
      }
  
  }
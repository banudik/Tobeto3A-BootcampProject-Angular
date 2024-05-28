import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { BootcampLogsListItemDto } from "../../models/responses/bootcamp-logs/bootcamp-logs-list-item-dto";
import { CreateBootcampLogsRequest } from "../../models/requests/bootcamp-logs/create-bootcamp-log-request";
import { CreatedBootcampLogsResponse } from "../../models/responses/bootcamp-logs/created-bootcamp-logs-response";


@Injectable()

export abstract class BootcampLogsBaseService {

    abstract getList(pageRequest: PageRequest):
        Observable<BootcampLogsListItemDto>;

    abstract add(request: CreateBootcampLogsRequest)
        : Observable<CreatedBootcampLogsResponse>;

    abstract getListByUserId(userId:string,bootcampId:number,pageRequest: PageRequest):
        Observable<BootcampLogsListItemDto>;



}
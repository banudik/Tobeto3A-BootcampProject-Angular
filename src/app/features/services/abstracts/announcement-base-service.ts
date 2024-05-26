import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { AnnouncementListItemDto } from "../../models/responses/announcement/announcement-list-item-dto";
import { DeletedAnnouncementResponse } from "../../models/responses/announcement/deleted-announcement-response";
import { GetByIdAnnouncementResponse } from "../../models/responses/announcement/get-by-id-announcement-response";
import { CreateAnnouncementRequest } from "../../models/requests/announcement/create-announcement-request";
import { CreatedAnnouncementResponse } from "../../models/responses/announcement/created-announcement-response";
import { UpdateAnnouncementRequest } from "../../models/requests/announcement/update-announcement-request";
import { UpdatedAnnouncementResponse } from "../../models/responses/announcement/updated-announcement-response";


@Injectable()

export abstract class AnnouncementBaseService {

    abstract getList(pageRequest: PageRequest):
        Observable<AnnouncementListItemDto>;

    abstract getByAnoouncementId(announcementId: number):
        Observable<GetByIdAnnouncementResponse>;

    abstract delete(id: number)
        : Observable<DeletedAnnouncementResponse>;

    abstract add(request: CreateAnnouncementRequest)
        : Observable<CreatedAnnouncementResponse>;
    abstract update(request: UpdateAnnouncementRequest)
        : Observable<UpdatedAnnouncementResponse>;


}
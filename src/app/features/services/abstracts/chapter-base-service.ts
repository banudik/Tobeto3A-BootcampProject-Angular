import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { CreateChapterRequest } from "../../models/requests/chapter/create-chapter-request";
import { UpdateChapterRequest } from "../../models/requests/chapter/update-chapter-request";
import { ChapterListItemDto } from "../../models/responses/chapter/chapter-list-item-dto";
import { CreatedChapterResponse } from "../../models/responses/chapter/created-chapter-response";
import { GetByIdChapterResponse } from "../../models/responses/chapter/get-by-id-chapter-response";
import { UpdatedChapterResponse } from "../../models/responses/chapter/updated-chapter-response";
import { DeletedChapterResponse } from "../../models/responses/chapter/deleted-chapter-response";

@Injectable()

export abstract class ChapterBaseService {

    abstract getList(pageRequest: PageRequest):
        Observable<ChapterListItemDto>;

        abstract getListByBootcampId(bootcampId:number , pageRequest: PageRequest):
        Observable<ChapterListItemDto>;

    abstract getByChapterId(chapterId: number):
        Observable<GetByIdChapterResponse>;

    abstract delete(id: number)
        : Observable<DeletedChapterResponse>;

    abstract add(request: CreateChapterRequest)
        : Observable<CreatedChapterResponse>;
    abstract update(request: UpdateChapterRequest)
        : Observable<UpdatedChapterResponse>;


}
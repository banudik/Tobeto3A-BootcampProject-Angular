import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetListBlacklistResponse } from '../../models/responses/blacklist/get-list-blacklist-response';
import { GetByIdBlacklistResponse } from '../../models/responses/blacklist/get-by-id-blacklist-response';
import { GetByIdApplicantResponse } from '../../models/responses/applicant/get-by-id-applicant-response';
import { CreateBlacklistRequest } from '../../models/requests/blacklist/create-blacklist-request';
import { CreatedBlacklistResponse } from '../../models/responses/blacklist/created-blacklist-response';
import { PageRequest } from '../../../core/models/page-request';
import { BlacklistListItemDto } from '../../models/responses/blacklist/blacklist-list-item-dto';
import { DeletedBlacklistResponse } from '../../models/responses/blacklist/deleted-blacklist-response';
import { UpdateBlacklistRequest } from '../../models/requests/blacklist/update-blacklist-request';
import { UpdatedBlacklistResponse } from '../../models/responses/blacklist/updated-blacklist-response';

@Injectable()

export abstract class BlacklistBaseService {

  abstract getList(pageRequest: PageRequest):
    Observable<BlacklistListItemDto>;

  abstract getById(blackListId: number):
    Observable<GetByIdBlacklistResponse>;

  abstract blackListApplicant(createBlackList: CreateBlacklistRequest):
    Observable<CreatedBlacklistResponse>;

  abstract delete(id: number)
    : Observable<DeletedBlacklistResponse>;

    abstract update(updateBlackListRequest: UpdateBlacklistRequest)
    : Observable<UpdatedBlacklistResponse>;
}
